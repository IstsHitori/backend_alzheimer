import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('Condition')
export class Condition {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @ManyToOne(() => Patient, patient => patient.conditions, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
