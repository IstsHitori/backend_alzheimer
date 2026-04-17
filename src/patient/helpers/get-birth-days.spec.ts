import { getBirthDays } from './get-birth-days';

describe('getBirthDays', () => {
  it('returns elapsed days since birth date', () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const days = getBirthDays(twoDaysAgo);

    expect(days).toBeGreaterThanOrEqual(2);
  });
});
