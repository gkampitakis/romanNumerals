import restify, { Server } from 'restify';
import Routes from './routes';
import config from './config';

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
      console.log(`Server Listening on ${config.port}`);
    });
  }
}

export default new App();
