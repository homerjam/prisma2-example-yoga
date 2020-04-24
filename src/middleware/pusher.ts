export default async function pusher(
  resolve: any,
  parent: any,
  args: any,
  ctx: any,
  info: any
) {
  const result = await resolve(parent, args, ctx, info);

  if (info.parentType.toString() === 'Mutation') {
    const data = {
      // userId: ctx.request.headers['x-user-id'],
      type: info.returnType.toString(),
      id: result.id,
    };
    ctx.pusher.trigger('app_id', 'Mutation', data);
  }

  return result;
}
