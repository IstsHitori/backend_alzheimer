import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { FamilyMemberBackgrounds } from './family-member-backgrounds.entity';

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

  @OneToOne(() => Patient, patient => patient.familyBackground)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @OneToMany(
    () => FamilyMemberBackgrounds,
    familyMemberBackgrounds => familyMemberBackgrounds.familyBackground,
  )
  familyMemberBackgrounds: FamilyMemberBackgrounds[];
}
