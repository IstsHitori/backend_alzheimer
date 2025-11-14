import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../constants/role';
import { Analysis } from 'src/analysis/entities';
import { Recent_Activity } from 'src/activity/entities/recent-activity.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    select: true,
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

  @OneToMany(() => Analysis, analisys => analisys.user)
  analysis: Analysis[];

  @OneToMany(() => Recent_Activity, activity => activity.user)
  recent_activities: Recent_Activity[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.trim().toLowerCase();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.trim().toLowerCase();
  }
}
