import chai, { expect } from 'chai';
import { toRoman, toArabic } from '../src/api/numerals/transform';

describe('Test From Arabic to Roman convert', function() {
  it('Should 10 = X', () => {
    expect(toRoman(10)).to.be.eq('X');
  });

  it('Wrong input <0', () => {
    expect(toRoman(-10)).to.be.eq('');
  });

  it('Wrong input >5000', () => {
    expect(toRoman(10000)).to.be.eq('');
  });

  it('Edge Numbers Wrong Input { 0 }', () => {
    expect(toRoman(0)).to.be.eq('');
  });

  it('Edge Numbers Wrong Input { 5000 }', () => {
    expect(toRoman(5000)).to.be.eq('');
  });

  it('Edge Numbers Correct Input { 1 }', () => {
    expect(toRoman(1)).to.be.eq('I');
  });

  it('Edge Numbers Correct Input { 4999 }', () => {
    expect(toRoman(4999)).to.be.eq('MMMMCMXCIX');
  });
});

describe('Test From Roman to Arabic convert', function() {
  it('Should X = 10 ', () => {
    expect(toArabic('X')).to.be.eq(10);
  });

  it('Wrong input { dasda }', () => {
    expect(toArabic('dasda')).to.be.NaN;
  });

  it('Wrong input >MMMMMMM', () => {
    expect(toArabic('MMMMMMM')).to.be.NaN;
  });

  it('Edge Numbers Wrong Input { 0 }', () => {
    expect(toArabic('')).to.be.NaN;
  });

  it('Edge Numbers Wrong Input { 5000 }', () => {
    expect(toArabic('MMMMM')).to.be.NaN;
  });

  it('Edge Numbers Correct Input { 1 }', () => {
    expect(toArabic('I')).to.be.eq(1);
  });

  it('Edge Numbers Correct Input { MMMMCMXCIX }', () => {
    expect(toArabic('MMMMCMXCIX')).to.be.eq(4999);
  });

  it('Random Number { CCLVI }', () => {
    expect(toArabic('CCLVI')).to.be.eq(256);
  });
});
