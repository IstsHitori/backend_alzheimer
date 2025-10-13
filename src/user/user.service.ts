import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Not } from 'typeorm';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { ROLE, USER_ERROR_MESSAGES, USER_SUCCES_MESSAGES } from './constants';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('HashAdapter')
    private readonly hashAdapter: HashAdapter,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.findUserByUserOrEmail(
      createUserDto.userName,
      createUserDto.email,
    );
    await this.validateRole(createUserDto.role);

    const user = this.userRepository.create(createUserDto);
    user.password = await this.hashAdapter.hash(user.password);
    await this.userRepository.save(user);

    return USER_SUCCES_MESSAGES.USER_CREATED;
  }

  async findAll(user: User) {
    return await this.userRepository.find({
      where: {
        id: Not(user.id),
      },
    });
  }

  async findOne(id: number) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser)
      throw new BadRequestException(USER_ERROR_MESSAGES.USER_NOT_FOUND);
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findConflictUser(
      id,
      updateUserDto.userName,
      updateUserDto.email,
    );
    const foundUser = await this.findOne(id);

    Object.assign(foundUser, updateUserDto);

    await this.userRepository.save(foundUser);

    return USER_SUCCES_MESSAGES.USER_UPDATED;
  }

  async remove(id: number) {
    const foundUser = await this.findOne(id);
    await this.userRepository.remove(foundUser);
    return USER_SUCCES_MESSAGES.USER_DELETED;
  }

  //Funciones auxiliares
  private async findUserByUserOrEmail(userName: string, email: string) {
    const foundUser = await this.userRepository.findOne({
      where: [
        {
          userName,
        },
        {
          email,
        },
      ],
    });
    if (foundUser)
      throw new BadRequestException(USER_ERROR_MESSAGES.USER_ALREADY_EXIST);
  }

  private async validateRole(role: ROLE) {
    const existOtherAdmin = await this.userRepository.findOne({
      where: {
        role,
      },
    });
    if (existOtherAdmin)
      throw new BadRequestException(USER_ERROR_MESSAGES.ADMIN_ALREADY_EXIST);
  }

  private async findConflictUser(
    id: number,
    userName?: string,
    email?: string,
  ) {
    const conflictUser = await this.userRepository.findOne({
      where: [
        {
          userName,
          id: Not(id),
        },
        {
          email,
          id: Not(id),
        },
      ],
    });

    if (conflictUser) {
      if (conflictUser.email === email)
        throw new BadRequestException(USER_ERROR_MESSAGES.EMAIL_IN_USE);

      if (conflictUser && conflictUser.userName === userName)
        throw new BadRequestException(USER_ERROR_MESSAGES.USERNAME_IN_USE);
    }
  }
}
