import * as dotenv from 'dotenv';
import path from 'path';

let _path;
_path =
  process.env.NODE_ENV === 'production'
    ? (_path = path.join(__dirname, '../../../.env.production'))
    : (_path = path.join(__dirname, '../../../.env.development'));

dotenv.config({ path: _path });

export const environment = {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_URI,
    name: process.env.MONGO_DB,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};

export enum SUPPORTED_NUMERAL_TYPES {
  ARABIC = 'arabic',
  ROMAN = 'roman'
}
