import { server } from './server';

server.start(({ port }) =>
  console.log(`🚀 Server ready, listening on :${port}`)
);
