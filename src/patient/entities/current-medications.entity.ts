import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientCurrentMedications } from '.';

@Entity('Current_medications')
export class CurrentMedications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  product: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  expedient: string;

  @Column({ type: 'text' })
  headline: string;

  @Column({ type: 'varchar', length: 30 })
  healthRegistry: string;

  @Column({ type: 'text' })
  commercialDescription: string;

  @Column({ type: 'varchar', length: 8 })
  atc: string;

  @Column({ type: 'text' })
  descriptionAtc: string;

  @Column({ type: 'boolean', default: false })
  medicalSample: boolean;

  @Column({ type: 'text' })
  viaAdministration: string;

  @Column({ type: 'text' })
  unitMeasurement: string;

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'text' })
  referenceUnit: string;

  @Column({ type: 'text' })
  pharmaceuticalForm: string;

  //-----Relations-----
  @OneToMany(
    () => PatientCurrentMedications,
    patientCm => patientCm.currentMedication,
  )
  patientCurrentMedications: PatientCurrentMedications[];
}
