import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('Current_medication')
export class CurrentMedication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @ManyToOne(() => Patient, patient => patient.currentMedications, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
