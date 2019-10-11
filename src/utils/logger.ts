import { LogInterface } from '../interfaces';

const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const WHITE = '\x1b[37m';

class Logger implements LogInterface {
  info(Component: string, message: any) {
    console.log(`${WHITE}[${BLUE}${Component}${WHITE}]: ${WHITE}${message}`);
  }
  error(Component: string, message: any) {
    console.log(`${WHITE}[${RED}${Component}${WHITE}]: ${WHITE}${message}`);
  }

  log(Component: string, message: any) {
    console.log(`${WHITE}[${GREEN}${Component}${WHITE}]: ${WHITE}${message}`);
  }
}

export default new Logger();
