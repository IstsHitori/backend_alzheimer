import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyBackgrounds, PatientCondition } from '.';

@Entity('Condition')
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'char',
    length: 4,
  })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  extra: string;

  //-----Relations-----
  @OneToMany(() => PatientCondition, patientCon => patientCon.patient)
  patientConditions: PatientCondition[];

  @OneToMany(() => FamilyBackgrounds, familyBg => familyBg.condition)
  familyBackgrounds: FamilyBackgrounds[];
}
