import { Request, Response } from 'restify';
import DBStorage from '../../dbStorage';
import { toArabic, toRoman, ROMAN_REGEX } from './transform';
import Logger from '../../utils/logger';

class Controller {
  public RomanToArabic = (req: Request, res: Response) => {
    const value = req.params.number.toUpperCase();
    if (!value || !ROMAN_REGEX.test(value))
      return this.handleError(res, 400, `Incorrect Input: ${value}`);

    const convertedValue = toArabic(value);

    DBStorage.insertDocument('numerals', {
      type: 'arabic',
      value: convertedValue
    })
      .then(() => {
        res.status(200);
        res.json({
          inputValue: value,
          convertedValue
        });
        Logger.info('Controller', '@GET /roman/:number');
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public ArabicToRoman = (req: Request, res: Response) => {
    const value = Number(req.params.number);
    if (!value || !Number.isInteger(value) || value >= 5000 || value < 1)
      return this.handleError(res, 400, `Incorrect Input: ${value}`);

    const convertedValue = toRoman(value);

    DBStorage.insertDocument('numerals', {
      type: 'roman',
      value: convertedValue
    })
      .then(() => {
        res.status(200);
        res.json({
          inputValue: value,
          convertedValue
        });
        Logger.info('Controller', '@GET /arabic/:number');
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public RetrieveAll = (req: Request, res: Response) => {
    const values = ['arabic', 'roman'];
    const query = req.params.numeralType.toLowerCase();
    if (values.indexOf(query) === -1)
      return this.handleError(res, 400, `Incorrect Input: ${query}`);

    DBStorage.retrieveDocuments('numerals', query)
      .then(data => {
        res.status(200);
        res.json(data);
        Logger.info('Controller', '@GET /all/:numeralType');
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public RemoveAll = (req: Request, res: Response) => {
    DBStorage.removeDocuments('numerals')
      .then(() => {
        res.status(200);
        res.end();
        Logger.info('Controller', '@DELETE /remove/all');
      })
      .catch(err => this.handleError(res, 500, err));
  };

  private handleError(res: Response, statusCode: number = 500, error?: any) {
    if (statusCode === 400) {
      Logger.error('Controller', error);
      res.status(400);
      return res.end();
    }

    res.status(500);
    error ? res.send(error) : res.json({ message: 'Unknown Error' });
    Logger.error('Controller', error ? error : 'Unknown Error');
  }
}

export default new Controller();
