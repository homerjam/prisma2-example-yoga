import { AuthenticationClient } from 'auth0';
import { Context } from '../context';

export const userGetAuthenticated = async (
  ctx: Context,
  createIfNotExists = false
) => {
  if (ctx.jwt.error) {
    throw new Error(ctx.jwt.error);
  }

  const auth0Id = ctx.jwt.payload.sub;

  // Get user using Auth0 ID
  let user = await ctx.prisma.auth0User
    .findOne({
      where: { auth0Id },
    })
    .user();

  if (!user && createIfNotExists) {
    // If user not found then get using email
    const auth0 = new AuthenticationClient({
      domain: process.env.AUTH0_DOMAIN,
    });

    const accessToken = ctx.request.headers.authorization.split(' ')[1];

    const auth0Profile = await auth0.getProfile(accessToken);

    user = await ctx.prisma.user.findOne({
      where: { email: auth0Profile.email },
    });

    if (!user) {
      // If user not found then create user
      user = await ctx.prisma.user.create({
        data: {
          email: auth0Profile.email,
          name: auth0Profile.name || '',
        },
      });
    }

    // Create or update Auth0 ID relation to user
    await ctx.prisma.auth0User.upsert({
      where: {
        auth0Id,
      },
      update: {
        user: {
          connect: { id: user.id },
        },
      },
      create: {
        auth0Id,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  if (user && ctx.request) {
    ctx.request.user = { ...ctx.request.user, ...user };
  }

  return user;
};
