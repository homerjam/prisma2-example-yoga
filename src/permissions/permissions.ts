import { chain } from 'graphql-shield';
import { PermissionError } from '../errors/errors';
import { Context } from '../context';
import { rules } from './rules';

export const permissions = {
  Query: {
    user: rules.jwtVerified,
    // posts: rules.jwtVerified,
  },
  Mutation: {
    updateOneUser: chain(rules.jwtVerified, rules.userIsSelf),
  },
};

export const fieldPermissions = {
  Mutation: {
    User: {
      async email(val: any, args: any, ctx: Context, info: any) {
        const preventUpdate = true;
        if (preventUpdate) {
          throw new PermissionError('user.email update disallowed');
        }
        return true;
      },
    },
  },
};
