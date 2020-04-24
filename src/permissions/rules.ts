import _ from 'lodash';
import { rule } from 'graphql-shield';
import { PermissionError } from '../errors/errors';
import { Context } from '../context';
import { userGetAuthenticated } from '../utils/userGetAuthenticated';
import { fieldPermissions } from './permissions';

export const rules = {
  jwtVerified: rule()(async (parent, args, ctx: Context) => {
    return ctx.jwt.error ? Error(ctx.jwt.error) : true;
  }),
  userIsSelf: rule()(async (parent, args, ctx: Context) => {
    if (!ctx.user) {
      try {
        ctx.user = await userGetAuthenticated(ctx);
      } catch (error) {
        return error;
      }
    }

    try {
      // const userId = ctx.request.headers['x-user-id'];
      const userId = _.get(args, 'userId') || _.get(args, 'where.id');
      if (ctx.user.id !== userId) {
        return new PermissionError('user is not self');
      }
    } catch (error) {
      return error;
    }

    return true;
  }),
  fieldPermissionsValid: rule()(async (parent, args, ctx: Context, info) => {
    try {
      const operation = info.parentType.toString();
      const type = info.returnType.toString();

      await Promise.all(
        _.map(args.data || args, async (val, field) => {
          const fieldRule = _.get(fieldPermissions, [operation, type, field]);
          if (!fieldRule) {
            return;
          }
          return await fieldRule(val, args, ctx, { operation, type, field });
        })
      );
    } catch (error) {
      return error;
    }

    return true;
  }),
};
