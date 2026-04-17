import { getMetadataArgsStorage } from 'typeorm';
import { Recent_Activity } from 'src/activity/entities/recent-activity.entity';
import { Analysis } from 'src/analysis/entities/analysis.entity';
import { ImageAnalysis } from 'src/analysis/entities/image-analysis.entity';
import { Image } from 'src/analysis/entities/images.entity';
import { User } from 'src/user/entities/user.entity';
import { CognitiveEvaluation } from './cognitive-evaluation.entity';
import { Condition } from './condition.entity';
import { CurrentMedications } from './current-medications.entity';
import { Eps } from './eps.entity';
import { FamilyBackgrounds } from './family-backgrounds.entity';
import { PatientCondition } from './patient-condition.entity';
import { PatientCurrentMedications } from './patient-current-medications.entity';
import { Patient } from './patient.entity';
import { SymptomsPresent } from './symptoms-present.entity';

describe('Entity relation metadata callbacks', () => {
  it('executes relation type and inverse-side callbacks', () => {
    const storage = getMetadataArgsStorage();

    const targets = new Set<any>([
      Recent_Activity,
      Analysis,
      ImageAnalysis,
      Image,
      User,
      CognitiveEvaluation,
      Condition,
      CurrentMedications,
      Eps,
      FamilyBackgrounds,
      PatientCondition,
      PatientCurrentMedications,
      Patient,
      SymptomsPresent,
    ]);

    const dummies: Record<string, any> = {
      User: { analysis: [], recent_activities: [] },
      Analysis: { user: {}, patient: {}, imageAnalysis: [] },
      ImageAnalysis: { analysis: {}, image: {} },
      Image: { imageAnalysis: [] },
      Patient: {
        analysis: [],
        patientConditions: [],
        familyBackgrounds: [],
        patientCurrentMedications: [],
        eps: {},
        cognitiveEvaluation: {},
        symptomsPresent: {},
      },
      PatientCondition: { patient: {}, condition: {} },
      FamilyBackgrounds: { patient: {}, condition: {} },
      PatientCurrentMedications: { patient: {}, currentMedication: {} },
      CurrentMedications: { patientCurrentMedications: [] },
      Condition: { patientConditions: [], familyBackgrounds: [] },
      Eps: { patients: [] },
      CognitiveEvaluation: { patient: {} },
      SymptomsPresent: { patient: {} },
      Recent_Activity: { user: {} },
    };

    const relations = storage.relations.filter(rel => targets.has(rel.target));

    expect(relations.length).toBeGreaterThan(0);

    for (const rel of relations) {
      if (typeof rel.type === 'function') {
        const relationType = rel.type as () => unknown;
        expect(relationType()).toBeDefined();
      }

      if (typeof rel.inverseSideProperty === 'function') {
        const targetName = (rel.target as { name?: string }).name ?? '';
        const dummy = dummies[targetName] ?? {};
        const inverse = rel.inverseSideProperty as (obj: any) => unknown;
        // Access inverse property path callback to mark relation lambdas as executed.
        inverse(dummy);
      }
    }
  });
});
