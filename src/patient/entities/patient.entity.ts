import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EDUCATION_LEVEL, GENDER } from '../constants';

import { getAge, getBirthDays } from '../helpers';
import { EpsRegime } from './eps-regime.entity';

@Entity('Patient')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  fullName: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  age: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  birthDays: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'float' })
  size: number;

  @Column({ type: 'float' })
  tension: number;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({
    type: 'enum',
    enum: EDUCATION_LEVEL,
  })
  educationLevel: EDUCATION_LEVEL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //----Relations-----
  @OneToOne(() => EpsRegime, epsRegime => epsRegime.patient, {
    onDelete: 'CASCADE',
  })
  epsRegime: EpsRegime;

  //----Functions-----
  @BeforeInsert()
  checkAgeInsert() {
    this.age = getAge(this.birthDate);
    this.birthDays = getBirthDays(this.birthDate);
  }

  @BeforeUpdate()
  checkAgeUpdates() {
    if (this.birthDate) {
      this.age = getAge(this.birthDate);
      this.birthDays = getBirthDays(this.birthDate);
    }
  }
}
