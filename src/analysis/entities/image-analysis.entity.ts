import {
  Entity,
  Column,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DIAGNOSIS } from '../constants';
import { Image, Analysis } from '.';

@Entity('Image_analysis')
export class ImageAnalysis {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @ManyToOne(() => Analysis, analysis => analysis.imageAnalysis, {
    onDelete: 'CASCADE',
  })
  analysis: Analysis;

  @Index()
  @ManyToOne(() => Image, image => image.imageAnalysis, {
    onDelete: 'CASCADE',
  })
  image: Image;

  @Column({ type: 'text' })
  diagnosis: DIAGNOSIS;

  @Column({ type: 'float' })
  nonDemented: number;

  @Column({ type: 'float' })
  veryMildDemented: number;

  @Column({ type: 'float' })
  mildDemented: number;

  @Column({ type: 'float' })
  moderateDemented: number;
}
