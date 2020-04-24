import dotenv from 'dotenv';
import { PrismaClient, User } from '@prisma/client';
import Pusher from 'pusher';
import { ContextParameters } from 'graphql-yoga/dist/types';

dotenv.config();

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn'],
});

const pusher = new Pusher({
  host: process.env.PUSHER_HOST,
  port: process.env.PUSHER_PORT,
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  // cluster: 'APP_CLUSTER'
});

export interface Context {
  prisma: PrismaClient;
  pusher: Pusher;
  request: any;
  response: any;
  connection: any;
  jwt: any;
  user: User;
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    prisma,
    pusher,
  };
}
