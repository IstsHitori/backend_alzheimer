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

  @Column({ type: 'varchar' })
  diagnosis: DIAGNOSIS;

  @Column({ type: 'float' })
  confidenceLevel: number;

  @Column({ type: 'float' })
  mmseEstimated: number;

  @Column({ type: 'float' })
  mocaEstimated: number;

  @Column({ type: 'float' })
  estimationConfidence: number;

  @Column({ type: 'text' })
  estimationNote: string;

  @Column({ type: 'float' })
  brainVolume: number;

  @Column({ type: 'float' })
  hippocampusVolume: number;

  @Column({ type: 'float' })
  corticalThickness: number;

  @Column({ type: 'int' })
  whiteMatterLesions: number;

  @Column({ type: 'float' })
  deviationFromNormal: number;

  @Column({ type: 'text', array: true })
  riskFactors: string[];

  @Column({ type: 'text', array: true })
  medicalRecommendations: string[];
}
