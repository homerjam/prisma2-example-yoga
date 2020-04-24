import * as path from 'path';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';
import { types } from './types/types';

export const schema = makeSchema({
  // Provide all the GraphQL types we've implemented
  types,

  plugins: [nexusPrismaPlugin()],

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
