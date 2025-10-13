import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TYPE_REPORT } from '../constants/data-enum';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: TYPE_REPORT,
  })
  type: TYPE_REPORT;

  @CreateDateColumn()
  createdAt: Date;
}
