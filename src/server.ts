import { GraphQLServer } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';
import jwt from './middleware/jwt';
import shield from './middleware/shield';
import pusher from './middleware/pusher';
import { schema as baseSchema } from './schema';
import { createContext } from './context';

export const schema = applyMiddleware(baseSchema, jwt, shield, pusher);

export const server = new GraphQLServer({
  schema,
  context: createContext,
});
