import { SUPPORTED_NUMERAL_TYPES } from '../config';

export interface numeral {
  type: SUPPORTED_NUMERAL_TYPES;
  value: number | string;
}

export interface LogInterface {
  info: (Component: string, message: any) => void;
  log: (Component: string, message: any) => void;
  error: (Component: string, message: any) => void;
}
