import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  //Para cargar todas las entidades que este modulo está definiendo
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CommonModule],
})
export class UserModule {}
