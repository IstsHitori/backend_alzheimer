import { getAge } from './get-age';

describe('getAge', () => {
  it('returns a non-negative integer age', () => {
    const birthDate = new Date('2000-01-01');
    const age = getAge(birthDate);

    expect(Number.isInteger(age)).toBe(true);
    expect(age).toBeGreaterThanOrEqual(0);
  });
});
