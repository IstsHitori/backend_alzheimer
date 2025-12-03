import { Logger } from '@nestjs/common';
import { ROLE } from 'src/user/constants';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { BOOTSTRAP_ADMIN_MESSAGES } from './messages';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from 'src/common/interfaces/hash.interface';

export async function bootstrapAdmin(
  dataSource: DataSource,
  config: ConfigService,
  hasher: HashAdapter,
) {
  const logger = new Logger(bootstrapAdmin.name);
  try {
    const userRepo = dataSource.getRepository(User);

    const existingAdmin = await userRepo.findOne({
      where: {
        role: ROLE.ADMIN,
        isActive: true,
      },
    });
    if (existingAdmin) return;

    const admin = userRepo.create({
      name: config.get<string>('ADMIN_NAME'),
      userName: config.get<string>('ADMIN_USERNAME'),
      password: await hasher.hash(config.get<string>('ADMIN_PASSWORD')!),
      email: config.get<string>('ADMIN_EMAIL'),
      role: ROLE.ADMIN,
    });
    await userRepo.save(admin);
    logger.log(BOOTSTRAP_ADMIN_MESSAGES.ADMIN_CREATED);
  } catch (error) {
    logger.error(error);
  }
}
