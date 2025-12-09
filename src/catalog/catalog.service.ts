import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condition, CurrentMedications, Eps } from 'src/patient/entities';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Eps)
    private readonly epsRepository: Repository<Eps>,
    @InjectRepository(CurrentMedications)
    private readonly currentMedicationRepository: Repository<CurrentMedications>,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {}

  async findAllEps() {
    return await this.epsRepository.find();
  }

  async findAllCum(limit: number = 10, offset: number = 0) {
    return await this.currentMedicationRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findCumBySearch(searchParam: string, limit: number = 10) {
    const searchTerm = `%${searchParam.toLowerCase()}%`;

    return await this.currentMedicationRepository.find({
      where: [{ expedient: ILike(searchTerm) }, { product: ILike(searchTerm) }],
      order: {
        product: 'ASC',
      },
      take: limit,
    });
  }

  async findAllCIE10(limit: number = 10, offset: number = 0) {
    return await this.conditionRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findCIE10BySearch(searchParam: string, limit: number = 10) {
    const searchTerm = `%${searchParam.toLowerCase()}%`;
    return await this.conditionRepository.find({
      where: [{ name: ILike(searchTerm) }, { code: ILike(searchTerm) }],
      order: { name: 'ASC' },
      take: limit,
    });
  }
}
