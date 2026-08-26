import {formatCurrency} from '../../scripts/utils/money.js'

// const centsCalculation = formatCurrency(2095) === 20.95 ? 'passed' : 'failed';
// const worksWithZero = formatCurrency(0) === 0.00 ? 'passed' : 'failed';
// const roundsUpNearestCent = formatCurrency(2000.5) === 20.01 ? 'passed' : 'failed';

// console.log(`cents calculation - ${centsCalculation}`);
// console.log(`working with zero - ${worksWithZero}`);
// console.log(`rounds up nearest-cent - ${roundsUpNearestCent}`);

describe('test suite - formatCurrency', () => {
  it('cents calculation', () => {
    expect(formatCurrency(2095)).toEqual(20.95);
  });
  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual(0.00);
  });
  it('rounds up nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual(20.01);
  })
})