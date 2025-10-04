import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  signin(loginUserDto: LoginUserDto) {
    try {
      return loginUserDto;
    } catch (error) {
      console.log(error);
    }
  }
}
