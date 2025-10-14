import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EDUCATION_LEVEL, GENDER, RISK_LEVEL } from '../constants';
import { getAge } from '../helpers/get-age';
import {
  CognitiveEvaluation,
  Condition,
  CurrentMedication,
  FamilyBackgrounds,
  SymptomsPresent,
} from '.';
import { PatientImages } from 'src/analysis/entities';

@Entity('Patient')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  fullName: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  age: number;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({
    type: 'enum',
    enum: EDUCATION_LEVEL,
  })
  educationLevel: EDUCATION_LEVEL;

  @Column({
    type: 'enum',
    enum: RISK_LEVEL,
    default: RISK_LEVEL.LOW,
    nullable: true,
  })
  riskLevel: RISK_LEVEL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Condition, condition => condition.patient, { cascade: true })
  conditions: Condition[];

  @OneToMany(() => CurrentMedication, medication => medication.patient, {
    cascade: true,
  })
  currentMedications: CurrentMedication[];

  @OneToOne(() => FamilyBackgrounds, fb => fb.patient, { cascade: true })
  familyBackground: FamilyBackgrounds;

  @OneToOne(() => SymptomsPresent, sp => sp.patient, { cascade: true })
  symptomsPresent: SymptomsPresent;

  @OneToOne(() => CognitiveEvaluation, ce => ce.patient, { cascade: true })
  cognitiveEvaluation: CognitiveEvaluation;

  @OneToMany(() => PatientImages, patientImages => patientImages.patient)
  patientImage: PatientImages[];

  @BeforeInsert()
  checkAgeInsert() {
    this.age = getAge(this.birthDate);
  }

  @BeforeUpdate()
  checkAgeUpdates() {
    this.age = getAge(this.birthDate);
  }
}
