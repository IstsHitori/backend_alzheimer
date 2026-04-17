import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DIAGNOSIS } from '../constants';
import { CreateAnalysisDto } from './create-analysis.dto';
import { CreateImageAnalysisDto } from './create-image-analysis.dto';
import { CreateImageDto } from './create-image.dto';
import { UpdateAnalysisDto } from './update-analysis.dto';
import * as dtoIndex from './index';

describe('Analysis DTOs', () => {
  it('CreateImageDto validates valid data', () => {
    const dto = plainToInstance(CreateImageDto, {
      imageUrl: 'https://img/1.png',
      fileName: '1.png',
    });
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('CreateImageAnalysisDto validates valid data', () => {
    const dto = plainToInstance(CreateImageAnalysisDto, {
      imageUrl: 'https://img/1.png',
      fileName: '1.png',
      diagnosis: DIAGNOSIS.NO_DEMENTED,
      nonDemented: 99,
      veryMildDemented: 0,
      mildDemented: 0,
      moderateDemented: 1,
    });
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('CreateAnalysisDto validates nested image analyses', () => {
    const dto = plainToInstance(CreateAnalysisDto, {
      patientId: '550e8400-e29b-41d4-a716-446655440000',
      imageAnalysis: [
        {
          imageUrl: 'https://img/1.png',
          fileName: '1.png',
          diagnosis: DIAGNOSIS.NO_DEMENTED,
          nonDemented: 99,
          veryMildDemented: 0,
          mildDemented: 0,
          moderateDemented: 1,
        },
      ],
    });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it('UpdateAnalysisDto accepts partial update', () => {
    const dto = plainToInstance(UpdateAnalysisDto, {
      patientId: '550e8400-e29b-41d4-a716-446655440000',
    });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it('analysis dto index exports are defined', () => {
    expect(dtoIndex.CreateAnalysisDto).toBeDefined();
    expect(dtoIndex.CreateImageDto).toBeDefined();
    expect(dtoIndex.CreateImageAnalysisDto).toBeDefined();
    expect(dtoIndex.UpdateAnalysisDto).toBeDefined();
  });
});
