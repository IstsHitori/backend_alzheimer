import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { REGIME } from '../constants';
import { Patient } from './patient.entity';

@Entity('Eps')
export class Eps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  nit: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 100 })
  entity: string;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ type: 'varchar', length: 20 })
  mobilityCode: string;

  @Column({ type: 'enum', enum: REGIME })
  regime: REGIME;

  //------Relations--------
  @OneToMany(() => Patient, patient => patient.eps)
  patients: Patient[];
}
