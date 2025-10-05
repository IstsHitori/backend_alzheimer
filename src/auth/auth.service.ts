import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { HashAdapter } from 'src/common/interfaces/hash.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('HashAdapter')
    private readonly hasher: HashAdapter,
  ) {}

  async signin(loginUserDto: LoginUserDto) {
    try {
      this.logger.log('Creating user');
      loginUserDto.password = await this.hasher.hash(loginUserDto.password);
      return loginUserDto;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
