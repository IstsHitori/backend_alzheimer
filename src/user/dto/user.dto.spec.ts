import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ROLE } from '../constants';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as userDtoIndex from './index';

describe('User DTOs', () => {
  it('CreateUserDto validates valid payload', () => {
    const dto = plainToInstance(CreateUserDto, {
      name: 'Ana Maria',
      userName: 'anam',
      password: 'Strong1!',
      email: 'ana@mail.com',
      role: ROLE.DOCTOR,
      isActive: true,
    });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it('CreateUserDto fails invalid payload', () => {
    const dto = plainToInstance(CreateUserDto, {
      name: 1,
      userName: 'a',
      password: 'weak',
      email: 'not-email',
      role: 'x',
    });

    expect(validateSync(dto).length).toBeGreaterThan(0);
  });

  it('UpdateUserDto allows partial payloads', () => {
    const dto = plainToInstance(UpdateUserDto, { name: 'Solo Nombre' });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it('user dto index exports are defined', () => {
    expect(userDtoIndex.CreateUserDto).toBeDefined();
    expect(userDtoIndex.UpdateUserDto).toBeDefined();
  });
});
