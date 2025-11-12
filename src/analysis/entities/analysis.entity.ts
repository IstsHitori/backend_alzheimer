import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageAnalysis } from '.';
import { Patient } from 'src/patient/entities';

@Entity('Analysis')
export class Analysis {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.analysis)
  user: User;

  @ManyToOne(() => Patient, patient => patient.analysis, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @OneToMany(() => ImageAnalysis, imageAnalysis => imageAnalysis.analysis, {
    cascade: true,
  })
  imageAnalysis: ImageAnalysis[];

  @CreateDateColumn()
  createdAt: Date;
}
