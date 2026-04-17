import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ACTIVITY_TYPE } from '../constants/enum-values';
import { CreateActivityDto } from './create-activity.dto';
import { UpdateActivityDto } from './update-activity.dto';

describe('Activity DTOs', () => {
  it('CreateActivityDto validates a valid payload', () => {
    const dto = plainToInstance(CreateActivityDto, {
      title: 'Analisis completado',
      description: 'Resultado correcto',
      type: ACTIVITY_TYPE.ANALYSIS,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it('CreateActivityDto fails for invalid payload', () => {
    const dto = plainToInstance(CreateActivityDto, {
      title: '',
      description: 12,
      type: 'invalid',
      userId: 'x',
    });

    expect(validateSync(dto).length).toBeGreaterThan(0);
  });

  it('UpdateActivityDto accepts partial payloads', () => {
    const dto = plainToInstance(UpdateActivityDto, {
      title: 'solo titulo',
    });

    expect(validateSync(dto)).toHaveLength(0);
  });
});
