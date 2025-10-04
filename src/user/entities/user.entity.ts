import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../constants/role';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  userName: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    type: 'enum',
    enum: ROLE,
    nullable: false,
  })
  role: ROLE;
  @Column({
    default: true,
  })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  lastAcces: Date;
}
