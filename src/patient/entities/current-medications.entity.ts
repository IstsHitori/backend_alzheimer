import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Current_medication')
export class CurrentMedication {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
