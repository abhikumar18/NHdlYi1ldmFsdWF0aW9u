import { calculateRelativeDate } from './relative-date';
import { expect } from '@open-wc/testing';

describe('Calculate Relative Date', () => {
  it('returns "Today" for current date', () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const expected = 'Today';
    const actual = calculateRelativeDate(currentDate);
    expect(actual).to.equal(expected);
  });

  it('returns "Yesterday" for yesterday\'s date', () => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayDateString = yesterdayDate.toISOString().slice(0, 10);
    const expected = 'Yesterday';
    const actual = calculateRelativeDate(yesterdayDateString);
    expect(actual).to.equal(expected);
  });


  it('returns "Long time ago" for any other date', () => {
    const oldDate = new Date(2020, 0, 1); //
    const oldDateString = oldDate.toISOString().slice(0, 10);
    const expected = 'Long time ago';
    const actual = calculateRelativeDate(oldDateString);
    expect(actual).to.equal(expected);
  });
  
  // I have added 3 testcases similarly we can add the other test cases
});
