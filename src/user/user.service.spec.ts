import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities';
import { ROLE, USER_ERROR_MESSAGES, USER_SUCCES_MESSAGES } from './constants';
import { HashAdapter } from 'src/common/interfaces/hash.interface';

describe('UserService', () => {
  let service: UserService;
  let userRepository: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    findOneBy: jest.Mock;
    remove: jest.Mock;
  };
  let hashAdapter: jest.Mocked<HashAdapter>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      remove: jest.fn(),
    };

    hashAdapter = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    service = new UserService(
      userRepository as unknown as Repository<User>,
      hashAdapter,
    );
  });

  it('creates a user and hashes the password', async () => {
    const createUserDto = {
      name: 'Ana Perez',
      userName: 'anap',
      password: 'Secret123!',
      email: 'ana@example.com',
      role: ROLE.ADMIN,
      isActive: true,
    };
    const createdUser = { ...createUserDto } as User;

    userRepository.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    userRepository.create.mockReturnValue(createdUser);
    hashAdapter.hash.mockResolvedValue('hashed-password');
    userRepository.save.mockResolvedValue(createdUser);

    await expect(service.create(createUserDto as any)).resolves.toBe(
      USER_SUCCES_MESSAGES.USER_CREATED,
    );

    expect(userRepository.findOne).toHaveBeenNthCalledWith(1, {
      where: [
        { userName: createUserDto.userName },
        { email: createUserDto.email },
      ],
    });
    expect(userRepository.findOne).toHaveBeenNthCalledWith(2, {
      where: { role: ROLE.ADMIN },
    });
    expect(hashAdapter.hash).toHaveBeenCalledWith(createUserDto.password);
    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'hashed-password' }),
    );
  });

  it('throws when the user already exists', async () => {
    const createUserDto = {
      name: 'Ana Perez',
      userName: 'anap',
      password: 'Secret123!',
      email: 'ana@example.com',
      role: ROLE.DOCTOR,
    };

    userRepository.findOne.mockResolvedValueOnce({ id: 'existing-user' });

    await expect(service.create(createUserDto as any)).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(hashAdapter.hash).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('updates a user and hashes the password when provided', async () => {
    const existingUser = {
      id: 'user-1',
      name: 'Ana Perez',
      userName: 'anap',
      password: 'old-password',
      email: 'ana@example.com',
      role: ROLE.DOCTOR,
    } as User;
    const updateUserDto = {
      name: 'Ana Updated',
      userName: 'anaup',
      password: 'Secret123!',
      email: 'ana.updated@example.com',
    };

    userRepository.findOne.mockResolvedValueOnce(null);
    userRepository.findOneBy.mockResolvedValueOnce(existingUser);
    hashAdapter.hash.mockResolvedValue('hashed-new-password');
    userRepository.save.mockResolvedValue({
      ...existingUser,
      ...updateUserDto,
      password: 'hashed-new-password',
    });

    await expect(service.update('user-1', updateUserDto as any)).resolves.toBe(
      USER_SUCCES_MESSAGES.USER_UPDATED,
    );

    expect(hashAdapter.hash).toHaveBeenCalledWith('Secret123!');
    expect(userRepository.save).toHaveBeenCalledWith(existingUser);
  });

  it('removes a user', async () => {
    const existingUser = {
      id: 'user-1',
      name: 'Ana Perez',
      userName: 'anap',
      password: 'hashed-password',
      email: 'ana@example.com',
      role: ROLE.DOCTOR,
    } as User;

    userRepository.findOneBy.mockResolvedValueOnce(existingUser);
    userRepository.remove.mockResolvedValue(existingUser);

    await expect(service.remove('user-1')).resolves.toBe(
      USER_SUCCES_MESSAGES.USER_DELETED,
    );

    expect(userRepository.remove).toHaveBeenCalledWith(existingUser);
  });
});
