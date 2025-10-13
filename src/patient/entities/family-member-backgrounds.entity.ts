import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyBackgrounds } from './family-backgrounds.entity';
import { FamilyMember } from './family-member.entity';

@Entity('Family_member_backgrounds')
export class FamilyMemberBackgrounds {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
