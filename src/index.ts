import restify, { Server } from 'restify';

class App {
  private server: Server;

  constructor() {
    this.server = restify.createServer();
    this.startServer();
  }

  startServer() {
    this.server.listen(5000, () => {
      console.log('Server Listening on 5000');
    });
  }
}

export default new App();
