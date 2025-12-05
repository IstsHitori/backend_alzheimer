import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalCalculationService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  calculatePercentage(value: number, total: number): number {
    return total > 0 ? (value / total) * 100 : 0;
  }

  async calculateAverageAge(): Promise<number> {
    const patients = await this.patientRepo.find();
    const numberOfPatients = patients.length;

    const averageAge =
      numberOfPatients > 0
        ? patients.reduce((sum, p) => sum + p.age, 0) / numberOfPatients
        : 0;

    return averageAge;
  }
  calculateModelAccuracy() {
    return 0.93;
  }
}
