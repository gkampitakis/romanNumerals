import { Server } from 'restify';

export default (app: Server) => {
  app.get('/arabic/:number', (req, res) => {
    res.send('test');
  });

  app.get('/roman/:number', (req, res) => {
    res.send('test');
  });

  app.get('/all/:numeralType', (req, res) => {
    res.send('test');
  });

  app.del('/remove/all', (req, res) => {
    res.send('test');
  });
};
