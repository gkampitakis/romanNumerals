import { Request, Response } from 'restify';
import DBStorage from '../../dbStorage';
import { toArabic, toRoman, ROMAN_REGEX } from './transform';

class Controller {
  public RomanToArabic = (req: Request, res: Response) => {
    const value = req.params.number;
    if (!value || !ROMAN_REGEX.test(value)) return this.handleError(res, 400);

    const convertedValue = toArabic(value);

    DBStorage.insertDocument('numerals', {
      type: 'arabic',
      value: convertedValue
    })
      .then(() => {
        res.status(200);
        res.json({
          type: 'arabic',
          convertedValue
        });
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public ArabicToRoman = (req: Request, res: Response) => {
    const value = Number(req.params.number);
    if (!value || !Number.isInteger(value)) return this.handleError(res, 400);

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
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public RetrieveAll = (req: Request, res: Response) => {
    const values = ['arabic', 'roman'];
    const query = req.params.numeralType;
    if (values.indexOf(query) === -1) return this.handleError(res, 400);

    DBStorage.retrieveDocuments('numerals', query)
      .then(data => {
        res.status(200);
        res.json(data);
      })
      .catch(err => this.handleError(res, 500, err));
  };

  public RemoveAll = (req: Request, res: Response) => {
    DBStorage.removeDocuments('numerals')
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch(err => this.handleError(res, 500, err));
  };

  private handleError(res: Response, statusCode: number = 500, error?: any) {
    if (statusCode === 400) {
      res.status(400);
      return res.end();
    }

    res.status(500);
    error ? res.send(error) : res.json({ message: 'Unknown Error' });
  }
}

export default new Controller();
