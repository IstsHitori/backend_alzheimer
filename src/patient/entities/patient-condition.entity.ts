import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient, Condition } from '.';

@Entity('Patient_condition')
export class PatientCondition {
  @PrimaryGeneratedColumn()
  id: number;

  //-----Relations-----
  @ManyToOne(() => Patient, patient => patient.patientConditions, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @ManyToOne(() => Condition, condition => condition.patientConditions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  condition: Condition;
}
