import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Condition, CurrentMedications, Eps, Patient } from '../entities';
import { PATIENT_ERROR_MESSAGES } from '../constants';
import { EntityManager } from 'typeorm';

@Injectable()
export class PatientValidatorService {
  constructor() {}

  async validatePatientExistence(
    identification: Patient['identification'],
    manager: EntityManager,
  ) {
    const foundPatient = await manager.findOne(Patient, {
      where: { identification },
    });
    if (foundPatient)
      throw new BadRequestException(
        PATIENT_ERROR_MESSAGES.PATIENT_IDENTIFICATION_EXIST,
      );
  }

  async findEpsById(id: Eps['id'], manager: EntityManager): Promise<Eps> {
    const foundEps = await manager.findOne(Eps, { where: { id } });
    if (!foundEps)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.EPS_NOT_FOUND);
    return foundEps;
  }

  async getValidCondition(
    code: Condition['code'],
    manager: EntityManager,
  ): Promise<Condition> {
    const foundCondition = await manager.findOne(Condition, {
      where: { code },
    });
    if (!foundCondition)
      throw new NotFoundException(
        `Condición médica con código: ${code} no encontrada`,
      );

    return foundCondition;
  }

  async getValidMedication(
    expedient: CurrentMedications['expedient'],
    manager: EntityManager,
  ): Promise<CurrentMedications> {
    const foundExpedient = await manager.findOne(CurrentMedications, {
      where: { expedient },
    });
    if (!foundExpedient)
      throw new NotFoundException(
        `Medicamento con expediente: ${expedient} no encontrada`,
      );

    return foundExpedient;
  }
}
