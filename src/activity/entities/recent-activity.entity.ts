import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ACTIVITY_TYPE } from '../constants/enum-values';
import { User } from 'src/user/entities/user.entity';

@Entity('Recent_activity')
export class Recent_Activity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ACTIVITY_TYPE,
  })
  type: ACTIVITY_TYPE;

  @ManyToOne(() => User, user => user.analysis, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
