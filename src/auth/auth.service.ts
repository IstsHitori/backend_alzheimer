import { Injectable, Logger } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  signin(loginUserDto: LoginUserDto) {
    try {
      this.logger.log('Creating user');
      return loginUserDto;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
