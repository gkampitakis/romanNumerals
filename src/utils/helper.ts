import { SUPPORTED_NUMERAL_TYPES } from '../config';

class HelperFunctions {
  private static instance: HelperFunctions;
  private numeralTypes: Set<string> = new Set<string>();

  private constructor() {
    let key: keyof typeof SUPPORTED_NUMERAL_TYPES;
    for (key in SUPPORTED_NUMERAL_TYPES) {
      this.numeralTypes.add(SUPPORTED_NUMERAL_TYPES[key]);
    }
  }

  static getInstance() {
    if (!HelperFunctions.instance)
      HelperFunctions.instance = new HelperFunctions();

    return HelperFunctions.instance;
  }

  isSupported(type: string) {
    return this.numeralTypes.has(type);
  }
}

export default HelperFunctions.getInstance();
