import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('Symptoms_present')
export class SymptomsPresent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index('IDX_symptoms_patient', ['patientId'])
  @Column({
    unique: true,
  })
  patientId: number;

  @Column({
    default: false,
  })
  memoryLoss: boolean;

  @Column({
    default: false,
  })
  lenguageProblems: boolean;

  @Column({
    default: false,
  })
  difficultyWithTasks: boolean;

  @Column({
    default: false,
  })
  disorientation: boolean;

  @Column({
    default: false,
  })
  personalityChanges: boolean;

  @Column({
    default: false,
  })
  temporalConfusion: boolean;

  @OneToOne(() => Patient, patient => patient.symptomsPresent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'patientId',
  })
  patient: Patient;
}
