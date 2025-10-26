import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientImages } from './patient-images.entity';

@Entity('Image')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
  })
  imageUrl: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PatientImages, patientImages => patientImages.image, {
    cascade: true,
  })
  patientImage: PatientImages[];
}
