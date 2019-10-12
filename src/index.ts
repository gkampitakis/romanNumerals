import restify, { Server } from 'restify';
import Routes from './routes';
import { environment } from './config';
import Logger from './utils/logger';

class App {
  private server: Server;

  constructor() {
    this.server = restify.createServer();
    this.startServer();
    this.setupServer();
  }

  setupServer() {
    this.server.use(function crossOrigin(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      return next();
    });
    Routes(this.server);
  }

  startServer() {
    this.server.listen(environment.port, () => {
      Logger.info('App', `Server Listening on port: ${environment.port}`);
    });
  }
}

export default new App();
