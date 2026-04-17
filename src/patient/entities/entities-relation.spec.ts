import { Condition } from './condition.entity';
import { CognitiveEvaluation } from './cognitive-evaluation.entity';
import { FamilyBackgrounds } from './family-backgrounds.entity';
import { PatientCondition } from './patient-condition.entity';
import { PatientCurrentMedications } from './patient-current-medications.entity';

describe('Patient relation entities smoke', () => {
  it('instantiates patient relation entities', () => {
    const condition = new Condition();
    condition.id = 1;
    condition.code = 'A00';
    condition.name = 'Condition';
    condition.description = 'desc';
    condition.extra = 'extra';

    const family = new FamilyBackgrounds();
    family.id = 2;
    family.condition = condition;

    const patientCondition = new PatientCondition();
    patientCondition.id = 3;
    patientCondition.condition = condition;

    const pcm = new PatientCurrentMedications();
    pcm.id = 4;

    const cog = new CognitiveEvaluation();
    cog.id = 5;
    cog.mmse = 10;
    cog.moca = 11;

    expect(family.condition.code).toBe('A00');
    expect(patientCondition.id).toBe(3);
    expect(pcm.id).toBe(4);
    expect(cog.mmse).toBe(10);
  });
});
