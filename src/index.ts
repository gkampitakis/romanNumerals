import restify, { Server } from 'restify';
import Routes from './routes';
import { environment } from './config';
import Logger from './utils/logger';
import corsMiddleware from 'restify-cors-middleware';

class App {
  private server: Server;

  constructor() {
    this.server = restify.createServer();
    this.startServer();
    this.setupServer();
  }

  setupServer() {
    const cors = corsMiddleware({
      origins: ['*'],
      allowHeaders: ['Authorization'],
      exposeHeaders: ['Authorization']
    });
    this.server.pre(cors.preflight);
    this.server.use(cors.actual);
    Routes(this.server);
  }

  startServer() {
    this.server.listen(environment.port, () => {
      Logger.info('App', `Server Listening on port: ${environment.port}`);
    });
  }
}

export default new App();
