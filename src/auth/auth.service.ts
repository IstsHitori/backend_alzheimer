import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AUTH_ERROR_MESSAGES } from './constants';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('HashAdapter')
    private readonly hasher: HashAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async signin(loginUserDto: LoginUserDto) {
    this.logger.log('Login user');
    const findUser = await this.userRepository.findOne({
      where: {
        userName: loginUserDto.userName,
      },
    });
    if (!findUser)
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);

    const isValidPassword = await this.hasher.compare(
      loginUserDto.password,
      findUser.password,
    );
    if (!isValidPassword)
      throw new BadRequestException(AUTH_ERROR_MESSAGES.PASSWORD_INVALID);

    const token = this.getJwtToken({ id: findUser.id });
    return { token };
  }

  getUserProfile({ id, name, userName, role }: User) {
    return { id, name, userName, role };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
