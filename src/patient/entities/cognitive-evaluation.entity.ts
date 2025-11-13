import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('Cognitive_evaluation')
export class CognitiveEvaluation {
  @Column({ type: 'float' })
  mmse: number;

  @Column({ type: 'float' })
  moca: number;

  @UpdateDateColumn()
  updatedAt: Date;

  //-----Relations-----
  @OneToOne(() => Patient, patient => patient.cognitiveEvaluation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  patient: Patient;
}
