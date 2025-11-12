import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EpsRegime } from './eps-regime.entity';

@Entity('Healthy_regime')
export class HealthyRegime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  //-----Relations------
  @OneToMany(() => EpsRegime, epsRegime => epsRegime.healthyRegime)
  epsRegime: EpsRegime[];
}
