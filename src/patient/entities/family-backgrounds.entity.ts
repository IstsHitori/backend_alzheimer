import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMemberBackgrounds, Patient } from '.';

@Entity('FamilyBackgrounds')
export class FamilyBackgrounds {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    default: false,
  })
  hasAlzheimerFamily: boolean;

  @Column({
    default: false,
  })
  hasDementialFamily: boolean;

  @OneToOne(() => Patient, patient => patient.familyBackground, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @OneToMany(() => FamilyMemberBackgrounds, fmb => fmb.familyBackground, {
    cascade: true,
  })
  familyMemberBackgrounds: FamilyMemberBackgrounds[];
}
