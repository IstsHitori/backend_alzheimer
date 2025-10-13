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
    nullable: true,
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
    nullable: true,
  })
  riskLevel: RISK_LEVEL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Condition, condition => condition.patient)
  conditions: Condition[];

  @OneToMany(
    () => CurrentMedication,
    currentMedication => currentMedication.patient,
  )
  currentMedications: CurrentMedication[];

  @OneToOne(
    () => FamilyBackgrounds,
    familyBackgrounds => familyBackgrounds.patient,
  )
  familyBackground: FamilyBackgrounds;

  @OneToOne(() => SymptomsPresent, symptomsPresent => symptomsPresent.patient)
  symptomsPresent: SymptomsPresent;

  @OneToOne(
    () => CognitiveEvaluation,
    cognitiveEvaluation => cognitiveEvaluation.patient,
  )
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
