import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AUTH_ERROR_MESSAGES } from '../constants';
import { JwtStrategy } from './jwt.s.trategy';
import { User } from 'src/user/entities/user.entity';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    userRepository = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    const configService = {
      get: jest.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    strategy = new JwtStrategy(userRepository, configService);
  });

  it('returns user when payload is valid and user is active', async () => {
    const foundUser = {
      id: 'user-1',
      isActive: true,
    } as User;
    userRepository.findOne.mockResolvedValue(foundUser);

    await expect(strategy.validate({ id: 'user-1' })).resolves.toBe(foundUser);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: { password: false },
    });
  });

  it('throws unauthorized when user is missing', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(strategy.validate({ id: 'missing' })).rejects.toThrow(
      new UnauthorizedException(AUTH_ERROR_MESSAGES.UNHAUTORIZED),
    );
  });

  it('throws unauthorized when user is inactive', async () => {
    userRepository.findOne.mockResolvedValue({ isActive: false } as User);

    await expect(strategy.validate({ id: 'user-1' })).rejects.toThrow(
      new UnauthorizedException(AUTH_ERROR_MESSAGES.INACTIVATED),
    );
  });
});
