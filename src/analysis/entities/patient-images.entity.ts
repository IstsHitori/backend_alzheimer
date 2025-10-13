import { Patient } from 'src/patient/entities';
import {
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Analysis, Image } from '.';

@Unique('UQ_patient_image_combination', ['patient', 'image', 'analysis'])
@Entity('Patient_images')
export class PatientImages {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @ManyToOne(() => Patient, patient => patient.patientImage)
  patient: Patient;

  @Index()
  @ManyToOne(() => Image, image => image.patientImage)
  image: Image;

  @Index()
  @ManyToOne(() => Analysis, analysis => analysis.patientImage)
  analysis: Analysis;
}
