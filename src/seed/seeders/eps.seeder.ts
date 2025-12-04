import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ExcelParserService } from '../helpers';
import { Eps } from 'src/patient/entities';
import { SEED_MESSAGES } from '../messages';
import { EpsData } from '../interfaces';
@Injectable()
export class EpsSeeder {
  private readonly logger = new Logger(EpsSeeder.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private excelParser: ExcelParserService,
  ) {}

  async run(filePath: string) {
    if (await this.hasData()) return;

    const data = this.excelParser.readData<EpsData>(filePath);

    if (data.length === 0) return;

    this.logger.debug(SEED_MESSAGES.CREATING_EPS);

    await this.createAndSaveEps(data);
  }

  private async hasData(): Promise<boolean> {
    const count = await this.dataSource.manager.count(Eps, {
      select: ['id'],
      take: 1,
    });

    return count > 0;
  }

  private async createAndSaveEps(data: EpsData[]) {
    await this.dataSource.transaction(async manager => {
      const epsEntities = data.map(eps => manager.create(Eps, eps));

      await manager.save(Eps, epsEntities);

      this.logger.debug(SEED_MESSAGES.EPS_CREATED);
    });
  }
}
