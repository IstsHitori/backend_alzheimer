import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FAMILY_MEMBER } from '../constants';
import { FamilyMemberBackgrounds } from './family-member-backgrounds.entity';

@Entity('Family_member')
export class FamilyMember {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: FAMILY_MEMBER,
  })
  name: FAMILY_MEMBER;

  @OneToMany(
    () => FamilyMemberBackgrounds,
    familyMemberBackgrounds => familyMemberBackgrounds.familyMember,
  )
  familyMemberBackgrounds: FamilyMemberBackgrounds[];
}
