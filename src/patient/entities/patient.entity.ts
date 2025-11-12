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
import { EDUCATION_LEVEL, GENDER } from '../constants';
import {
  CognitiveEvaluation,
  Condition,
  CurrentMedication,
  FamilyBackgrounds,
  SymptomsPresent,
} from '.';
import { getAge, getBirthDays } from '../helpers';
import { Analysis } from 'src/analysis/entities';

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

  @OneToMany(() => Analysis, analysis => analysis.patient)
  analysis: Analysis[];

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
