import { Patient } from './patient.entity';

describe('Patient entity hooks', () => {
  it('calculates age and birthDays on insert', () => {
    const patient = new Patient();
    patient.birthDate = new Date('2000-01-01');

    patient.checkAgeInsert();

    expect(patient.age).toBeGreaterThanOrEqual(0);
    expect(patient.birthDays).toBeGreaterThan(0);
  });

  it('recalculates age and birthDays on update when birthDate exists', () => {
    const patient = new Patient();
    patient.birthDate = new Date('1999-05-05');

    patient.checkAgeUpdates();

    expect(patient.age).toBeGreaterThanOrEqual(0);
    expect(patient.birthDays).toBeGreaterThan(0);
  });
});
