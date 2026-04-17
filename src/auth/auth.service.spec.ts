import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AUTH_ERROR_MESSAGES } from './constants';
import { HashAdapter } from 'src/common/interfaces/hash.interface';
import { User } from 'src/user/entities';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;
  let hasher: jest.Mocked<HashAdapter>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    service = new AuthService(userRepository, hasher, jwtService);
  });

  it('returns a token on valid credentials', async () => {
    const foundUser = {
      id: 'user-1',
      userName: 'doctor1',
      password: 'hashed',
    } as User;

    userRepository.findOne.mockResolvedValue(foundUser);
    hasher.compare.mockResolvedValue(true);
    jwtService.sign.mockReturnValue('jwt-token');

    await expect(
      service.signin({ userName: 'doctor1', password: 'Secret123!' }),
    ).resolves.toEqual({ token: 'jwt-token' });

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { userName: 'doctor1' },
    });
    expect(hasher.compare).toHaveBeenCalledWith('Secret123!', 'hashed');
    expect(jwtService.sign).toHaveBeenCalledWith({ id: 'user-1' });
  });

  it('throws unauthorized when user does not exist', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(
      service.signin({ userName: 'missing', password: 'Secret123!' }),
    ).rejects.toThrow(new UnauthorizedException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND));
  });

  it('throws bad request when password is invalid', async () => {
    userRepository.findOne.mockResolvedValue({
      id: 'user-1',
      userName: 'doctor1',
      password: 'hashed',
    } as User);
    hasher.compare.mockResolvedValue(false);

    await expect(
      service.signin({ userName: 'doctor1', password: 'wrong' }),
    ).rejects.toThrow(new BadRequestException(AUTH_ERROR_MESSAGES.PASSWORD_INVALID));
  });

  it('returns user profile fields', () => {
    const profile = service.getUserProfile({
      id: 'user-1',
      name: 'Ana',
      userName: 'ana1',
      role: 'admin',
    } as unknown as User);

    expect(profile).toEqual({
      id: 'user-1',
      name: 'Ana',
      userName: 'ana1',
      role: 'admin',
    });
  });
});
