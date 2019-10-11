export interface numeral {
  type: 'arabic' | 'roman';
  value: number | string;
}

export interface LogInterface {
  info: (Component: string, message: any) => void;
  log: (Component: string, message: any) => void;
  error: (Component: string, message: any) => void;
}
