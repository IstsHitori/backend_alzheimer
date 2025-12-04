import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { ROLE } from 'src/user/constants';
import { User } from 'src/user/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { SEED_MESSAGES } from '../messages';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AdminSeeder {
  private readonly logger = new Logger(AdminSeeder.name);
  constructor(
    private readonly config: ConfigService,
    @Inject('HashAdapter')
    private readonly hasher: HashAdapter,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async run() {
    await this.dataSource.transaction(async manager => {
      const existAdmin = await this.isAdminExist(manager);

      if (existAdmin) return;

      this.logger.debug(SEED_MESSAGES.CREATING_ADMIN);

      await this.createAdminAndSave(manager);

      this.logger.debug(SEED_MESSAGES.ADMIN_CREATED);
    });
  }

  private async isAdminExist(manager: EntityManager) {
    const userAdmin = await manager.findOne(User, {
      where: { role: ROLE.ADMIN, isActive: true },
    });
    return !!userAdmin;
  }

  private async createAdminAndSave(manager: EntityManager) {
    const userAdminEntity = manager.create(User, {
      name: this.config.get<string>('ADMIN_NAME'),
      userName: this.config.get<string>('ADMIN_USERNAME'),
      password: await this.hasher.hash(
        this.config.get<string>('ADMIN_PASSWORD')!,
      ),
      email: this.config.get<string>('ADMIN_EMAIL'),
      role: ROLE.ADMIN,
    });

    await manager.save(User, userAdminEntity);
  }
}
