import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EpsRegime } from '.';

@Entity('Eps')
export class Eps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  nit: number;

  @Column({ type: 'boolean' })
  isActite: boolean;

  @Column({ type: 'varchar', length: 100 })
  entity: string;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ type: 'varchar', length: 20 })
  mobilityCode: string;

  //------Relations--------
  @OneToMany(() => EpsRegime, epsRegime => epsRegime.eps)
  epsRegime: EpsRegime[];
}
