import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientImages } from './patient-images.entity';

@Entity('Analysis')
export class Analysis {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.analisys)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PatientImages, patientImages => patientImages.analysis)
  patientImage: PatientImages;
}
