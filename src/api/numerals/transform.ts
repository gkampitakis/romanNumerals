const numeralMap: Map<string, number> = new Map([
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
]);

export const ROMAN_REGEX = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function toRoman(number: number): string {
  let result = '';
  if (number >= 5000 || number <= 0) return result;

  numeralMap.forEach((value, key) => {
    while (number % value < number) {
      result += key;
      number -= value;
    }
  });

  return result;
}

export function toArabic(number: string): number {
  let result = 0;
  if (!number || !ROMAN_REGEX.test(number)) return NaN;

  numeralMap.forEach((value, key) => {
    while (number.length > 0 && number.indexOf(key) === 0) {
      result += value;
      number = number.replace(key, '');
    }
  });

  return result;
}
