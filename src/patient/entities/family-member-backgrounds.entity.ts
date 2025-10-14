import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyBackgrounds, FamilyMember } from '.';

@Entity('Family_member_backgrounds')
export class FamilyMemberBackgrounds {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => FamilyBackgrounds,
    familyBackgrounds => familyBackgrounds.familyMemberBackgrounds,
    {
      onDelete: 'CASCADE',
    },
  )
  familyBackground: FamilyBackgrounds;

  @ManyToOne(
    () => FamilyMember,
    familyMember => familyMember.familyMemberBackgrounds,
    { eager: true }, // opcional para cargar automáticamente
  )
  familyMember: FamilyMember;
}
