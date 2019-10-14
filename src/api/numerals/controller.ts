import { Request, Response } from 'restify';
import DBStorage from '../../dbStorage';
import { toArabic, toRoman, ROMAN_REGEX } from './transform';
import Logger from '../../utils/logger';
import Helper from '../../utils/helper';
import { numeral } from '../../interfaces';

class Controller {
  public RomanToArabic = async (req: Request, res: Response) => {
    const value = req.params.number.toUpperCase();
    if (!value || !ROMAN_REGEX.test(value))
      return this.handleError(res, 400, `Incorrect Input: ${value}`);

    try {
      const doc: numeral = await DBStorage.retrieveDocument('numerals', {
        roman: value
      });

      if (doc) {
        this.handleResponse(
          res,
          {
            inputValue: value,
            convertedValue: doc.arabic
          },
          200,
          '@GET /arabic/:number'
        );
      } else {
        const convertedValue = toArabic(value);
        await DBStorage.insertDocument('numerals', {
          arabic: convertedValue,
          roman: value
        });

        this.handleResponse(
          res,
          {
            inputValue: value,
            convertedValue
          },
          200,
          '@GET /arabic/:number'
        );
      }
    } catch (error) {
      this.handleError(res, 500, error);
    }
  };

  public ArabicToRoman = async (req: Request, res: Response) => {
    const value = Number(req.params.number);
    if (!value || !Number.isInteger(value) || value >= 5000 || value < 1)
      return this.handleError(res, 400, `Incorrect Input: ${value}`);

    try {
      const doc: numeral = await DBStorage.retrieveDocument('numerals', {
        arabic: value
      });

      if (doc) {
        this.handleResponse(
          res,
          {
            inputValue: value,
            convertedValue: doc.roman
          },
          200,
          '@GET /roman/:number'
        );
      } else {
        const convertedValue = toRoman(value);
        await DBStorage.insertDocument('numerals', {
          roman: convertedValue,
          arabic: value
        });

        this.handleResponse(
          res,
          {
            inputValue: value,
            convertedValue
          },
          200,
          '@GET /roman/:number'
        );
      }
    } catch (error) {
      this.handleError(res, 500, error);
    }
  };

  public RetrieveAll = (req: Request, res: Response) => {
    const query = req.params.numeralType.toLowerCase();

    if (!Helper.isSupported(query))
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

  private handleResponse(
    res: Response,
    data: any,
    status: number,
    path: string
  ) {
    res.status(status);
    res.json(data);
    Logger.info('Controller', path);
  }
}

export default new Controller();
