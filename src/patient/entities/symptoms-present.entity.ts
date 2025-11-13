import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('Symptoms_present')
export class SymptomsPresent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  memoryLoss: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  lenguageProblems: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  difficultyWithTasks: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  disorientation: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  personalityChanges: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  temporalConfusion: boolean;

  //-----Relations-----
  @OneToOne(() => Patient, patient => patient.symptomsPresent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  patient: Patient;
}
