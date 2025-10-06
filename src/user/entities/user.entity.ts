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
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'text',
    //Cuando se haga un find, no me traera la contraseña
    // select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: ROLE,
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

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastAcces: Date;
}
