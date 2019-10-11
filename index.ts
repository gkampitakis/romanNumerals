import restify, { Server } from 'restify';

const server: Server = restify.createServer();

server.listen(4000, () => {
  console.log('Hello World');
});
