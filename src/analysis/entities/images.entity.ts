import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageAnalysis } from '.';

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

  @OneToMany(() => ImageAnalysis, imageAnalysis => imageAnalysis.image)
  imageAnalysis: ImageAnalysis[];

  @CreateDateColumn()
  createdAt: Date;
}
