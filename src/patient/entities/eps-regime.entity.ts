import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Eps } from './eps.entity';
import { HealthyRegime } from './healty-regime.entity';
import { Patient } from './patient.entity';

@Entity('Eps_regime')
export class EpsRegime {
  @PrimaryGeneratedColumn()
  id: number;

  //-----Relations------
  @ManyToOne(() => Eps, eps => eps.epsRegime, { onDelete: 'CASCADE' })
  eps: Eps;

  @ManyToOne(() => HealthyRegime, healthy => healthy.epsRegime, {
    onDelete: 'CASCADE',
  })
  healthyRegime: HealthyRegime;

  @OneToOne(() => Patient, patient => patient.epsRegime, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
