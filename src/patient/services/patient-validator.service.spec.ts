import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../constants';
import { PatientValidatorService } from './patient-validator.service';

describe('PatientValidatorService', () => {
  let service: PatientValidatorService;
  let manager: { findOne: jest.Mock };

  beforeEach(() => {
    service = new PatientValidatorService();
    manager = { findOne: jest.fn() };
  });

  it('validatePatientExistence throws when patient already exists', async () => {
    manager.findOne.mockResolvedValue({ id: 'p1' });

    await expect(service.validatePatientExistence('123', manager as any)).rejects.toThrow(
      new BadRequestException(PATIENT_ERROR_MESSAGES.PATIENT_IDENTIFICATION_EXIST),
    );
  });

  it('validatePatientExistence passes when not found', async () => {
    manager.findOne.mockResolvedValue(null);

    await expect(service.validatePatientExistence('123', manager as any)).resolves.toBeUndefined();
  });

  it('findEpsById throws when eps is missing', async () => {
    manager.findOne.mockResolvedValue(null);

    await expect(service.findEpsById(1, manager as any)).rejects.toThrow(
      new NotFoundException(PATIENT_ERROR_MESSAGES.EPS_NOT_FOUND),
    );
  });

  it('findEpsById returns eps when found', async () => {
    manager.findOne.mockResolvedValue({ id: 1 });

    await expect(service.findEpsById(1, manager as any)).resolves.toEqual({ id: 1 });
  });

  it('getValidCondition throws when condition is missing', async () => {
    manager.findOne.mockResolvedValue(null);

    await expect(service.getValidCondition('A00', manager as any)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('getValidMedication throws when medication is missing', async () => {
    manager.findOne.mockResolvedValue(null);

    await expect(service.getValidMedication('X1', manager as any)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('validateIdentificationForUpdate throws if another patient has same id number', async () => {
    manager.findOne.mockResolvedValue({ id: 'p2' });

    await expect(
      service.validateIdentificationForUpdate('123', 'p1', manager as any),
    ).rejects.toThrow(
      new BadRequestException(PATIENT_ERROR_MESSAGES.PATIENT_IDENTIFICATION_EXIST),
    );
  });

  it('validateIdentificationForUpdate passes for same patient', async () => {
    manager.findOne.mockResolvedValue({ id: 'p1' });

    await expect(
      service.validateIdentificationForUpdate('123', 'p1', manager as any),
    ).resolves.toBeUndefined();
  });
});
