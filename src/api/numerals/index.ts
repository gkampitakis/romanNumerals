import { Server } from 'restify';
import Controller from './controller';
import { SUPPORTED_NUMERAL_TYPES } from '../../config';

export default (app: Server) => {
  app.get(
    `/${SUPPORTED_NUMERAL_TYPES.ROMAN}/:number`,
    Controller.ArabicToRoman
  );

  app.get(
    `/${SUPPORTED_NUMERAL_TYPES.ARABIC}/:number`,
    Controller.RomanToArabic
  );

  app.get('/all/:numeralType', Controller.RetrieveAll);

  app.del('/remove/all', Controller.RemoveAll);
};
