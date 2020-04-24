import { jwtVerify } from '../utils/jwtVerify';

export default async function jwt(
  resolve: any,
  parent: any,
  args: any,
  ctx: any,
  info: any
) {
  let accessToken = ctx.connection
    ? ctx.connection.context.authorization
    : ctx.request.headers.authorization;

  accessToken = accessToken ? accessToken.split(' ').slice(-1)[0] : undefined;

  try {
    ctx.jwt = {
      verified: true,
      payload: await jwtVerify(accessToken),
    };
  } catch (error) {
    ctx.jwt = {
      verified: false,
      error,
    };
  }

  return await resolve(parent, args, ctx, info);
}
