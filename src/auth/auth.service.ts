import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AUTH_ERROR_MESSAGES } from './constants';
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
    this.logger.log('Creating user');
    const findUser = await this.userRepository.findOne({
      where: {
        userName: loginUserDto.userName,
      },
    });
    if (!findUser)
      throw new NotFoundException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);

    const isValidPassword = await this.hasher.compare(
      loginUserDto.password,
      findUser.password,
    );

    if (!isValidPassword)
      throw new BadRequestException(AUTH_ERROR_MESSAGES.PASSWORD_INVALID);

    return 'Iniciando sesion..';
  }
}
