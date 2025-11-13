import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { CurrentMedications } from './current-medications.entity';

@Entity('Patient_current_medications')
export class PatientCurrentMedications {
  @PrimaryGeneratedColumn()
  id: number;

  //----Relations----
  @ManyToOne(() => Patient, patient => patient.patientCurrentMedications, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @ManyToOne(
    () => CurrentMedications,
    currentMedications => currentMedications.patientCurrentMedications,
    { onDelete: 'SET NULL', nullable: true },
  )
  currentMedication: CurrentMedications;
}
