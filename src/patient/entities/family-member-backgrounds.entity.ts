import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyBackgrounds } from './family-backgrounds.entity';
import { FamilyMember } from './family-member.entity';

@Entity('Family_member_backgrounds')
export class FamilyMemberBackgrounds {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Index('IDX_fmb_familyBackground', ['familyBackgroundId'])
  @Column()
  familyBackgroundId: number;

  @Index('IDX_fmb_familyMember', ['familyMemberId'])
  @Column()
  familyMemberId: number;

  @ManyToOne(
    () => FamilyBackgrounds,
    familyBackgrounds => familyBackgrounds.familyMemberBackgrounds,
  )
  familyBackground: FamilyBackgrounds;

  @ManyToOne(
    () => FamilyMember,
    familyMember => familyMember.familyMemberBackgrounds,
  )
  familyMember: FamilyMember;
}
