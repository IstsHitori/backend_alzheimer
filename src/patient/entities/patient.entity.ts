import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EDUCATION_LEVEL, GENDER } from '../constants';

import { getAge, getBirthDays } from '../helpers';
import { Analysis } from 'src/analysis/entities';
import {
  CognitiveEvaluation,
  Eps,
  FamilyBackgrounds,
  PatientCondition,
  PatientCurrentMedications,
  SymptomsPresent,
} from '.';

@Entity('Patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  identification: string;

  @Column({
    type: 'char',
    length: 10,
  })
  telephone: string;

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
    type: 'int',
    nullable: true,
  })
  birthDays: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'float' })
  size: number;

  @Column({ type: 'float' })
  tension: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //----Relations-----
  @OneToMany(() => Analysis, analysis => analysis.patient)
  analysis: Analysis[];

  @OneToMany(() => PatientCondition, patientCon => patientCon.patient)
  patientConditions: PatientCondition[];

  @OneToMany(() => FamilyBackgrounds, familyBg => familyBg.patient)
  familyBackgrounds: FamilyBackgrounds[];

  @OneToMany(() => PatientCurrentMedications, patientCm => patientCm.patient)
  patientCurrentMedications: PatientCurrentMedications[];

  @ManyToOne(() => Eps, eps => eps.patients, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  eps: Eps;

  @OneToOne(() => CognitiveEvaluation, evaluation => evaluation.patient)
  cognitiveEvaluation: CognitiveEvaluation;

  @OneToOne(() => SymptomsPresent, symptoms => symptoms.patient)
  symptomsPresent: SymptomsPresent;

  //----Functions-----
  @BeforeInsert()
  checkAgeInsert() {
    this.age = getAge(this.birthDate);
    this.birthDays = getBirthDays(this.birthDate);
  }

  @BeforeUpdate()
  checkAgeUpdates() {
    if (this.birthDate) {
      this.age = getAge(this.birthDate);
      this.birthDays = getBirthDays(this.birthDate);
    }
  }
}
