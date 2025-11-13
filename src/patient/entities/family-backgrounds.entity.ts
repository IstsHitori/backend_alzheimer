import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Condition, Patient } from '.';

@Entity('Family_backgrounds')
export class FamilyBackgrounds {
  @PrimaryGeneratedColumn()
  id: number;

  //-----Relations-----
  @ManyToOne(() => Patient, patient => patient.familyBackgrounds, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @ManyToOne(() => Condition, condition => condition.familyBackgrounds, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  condition: Condition;
}
