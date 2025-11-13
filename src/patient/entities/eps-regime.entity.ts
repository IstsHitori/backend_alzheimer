import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Eps } from './eps.entity';
import { HealthyRegime, Patient } from '.';

@Entity('Eps_regime')
export class EpsRegime {
  @PrimaryGeneratedColumn()
  id: number;

  //-----Relations------
  @ManyToOne(() => Eps, eps => eps.epsRegime, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  eps: Eps;

  @ManyToOne(() => HealthyRegime, healthy => healthy.epsRegime, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  healthyRegime: HealthyRegime;

  @OneToMany(() => Patient, patient => patient.epsRegime)
  patient: Patient;
}
