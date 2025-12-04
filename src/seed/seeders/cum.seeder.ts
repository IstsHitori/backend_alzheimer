import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { ExcelParserService } from '../helpers/excel-parser.service';
import { CurrentMedications } from 'src/patient/entities';
import { SEED_MESSAGES } from '../messages';
import { CUM } from '../interfaces';

@Injectable()
export class CumSeeder {
  private readonly BATCH_SIZE = 1000;
  private readonly logger = new Logger(CumSeeder.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly excelParser: ExcelParserService,
  ) {}

  async run(filePath: string) {
    if (await this.hasData()) return;

    const data = this.excelParser.readData<CUM>(filePath);

    if (data.length === 0) return;

    this.logger.debug(SEED_MESSAGES.CREATING_CUM);

    await this.createMedicationsAndSave(data);
  }

  private async hasData(): Promise<boolean> {
    const count = await this.dataSource.manager.count(CurrentMedications, {
      take: 1,
    });
    return count > 0;
  }

  private async createMedicationsAndSave(data: CUM[]) {
    for (let i = 0; i <= data.length; i += this.BATCH_SIZE) {
      const batch = data.slice(i, i + this.BATCH_SIZE);

      await this.dataSource.transaction(async manager => {
        const medicationEntities = batch.map(medication =>
          this.prepareCumEntity(manager, medication),
        );

        await manager.save(CurrentMedications, medicationEntities);
      });
    }

    this.logger.debug(SEED_MESSAGES.CUM_CREATED);
  }

  private prepareCumEntity(
    manager: EntityManager,
    { medicalSample, expedient, referenceUnit, ...rest }: CUM,
  ) {
    return manager.create(CurrentMedications, {
      medicalSample: medicalSample.toLowerCase() === 'si',
      expedient: expedient.toString(),
      referenceUnit: referenceUnit ?? 'N/A',
      ...rest,
    });
  }
}
