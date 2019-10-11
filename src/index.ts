import restify, { Server } from 'restify';
import Routes from './routes';
import config from './config';
import Logger from './utils/logger';

class App {
  private server: Server;

  constructor() {
    this.server = restify.createServer();
    this.startServer();
    this.setupServer();
  }

  setupServer() {
    Routes(this.server);
  }

  startServer() {
    this.server.listen(config.port, () => {
      Logger.info('App', `Server Listening on port: ${config.port}`);
    });
  }
}

export default new App();
