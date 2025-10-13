import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('CognitiveEvaluation')
export class CognitiveEvaluation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
  })
  patientId: number;

  @Column({
    type: 'float',
  })
  mmse: number;

  @Column({
    type: 'float',
  })
  moca: number;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToOne(() => Patient, patient => patient.cognitiveEvaluation)
  @JoinColumn({
    name: 'patientId',
  })
  patient: Patient;
}
