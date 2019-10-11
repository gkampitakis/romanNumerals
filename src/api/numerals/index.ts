import { Server } from 'restify';
import Controller from './controller';

export default (app: Server) => {
  app.get('/roman/:number', Controller.ArabicToRoman);

  app.get('/arabic/:number', Controller.RomanToArabic);

  app.get('/all/:numeralType', Controller.RetrieveAll);

  app.del('/remove/all', Controller.RemoveAll);
};
