import { Server } from 'restify';
import numeralRouter from './api/numerals';

export default (app: Server) => {
  numeralRouter(app);
};
