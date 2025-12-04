import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CognitiveEvaluation, Patient } from './entities';
import { PATIENT_ERROR_MESSAGES, PATIENT_SUCCES_MESSAGES } from './constants';
import { UpdateConginitiveEvaluationDto } from './dto';
import { User } from 'src/user/entities/user.entity';
import { ActivityService } from 'src/activity/activity.service';
import { ACTIVITY_TYPE } from 'src/activity/constants';
import { PatientPersistenceService, PatientQueryService } from './services';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(CognitiveEvaluation)
    private readonly cogEvaluationRepository: Repository<CognitiveEvaluation>,
    private readonly patientPersistenceService: PatientPersistenceService,
    private readonly patientQueryService: PatientQueryService,
    private readonly activityService: ActivityService,
  ) {}

  async create(createPatientDto: CreatePatientDto, userId: User['id']) {
    const createdPatient =
      await this.patientPersistenceService.createPatientTransaction(
        createPatientDto,
      );

    await this.activityService.create({
      title: 'Paciente creado',
      description: `Paciente ${createdPatient.fullName} creado con exito`,
      type: ACTIVITY_TYPE.CREATE_PATIENT,
      userId,
    });
    return 'Paciente creado';
  }

  async findAll() {
    const rawResults = await this.patientQueryService.findAll();
    return rawResults;
  }

  findOne(id: Patient['id']) {
    return '';
  }

  update(
    id: Patient['id'],
    updatePatientDto: UpdatePatientDto,
    userId: string,
  ) {
    return PATIENT_SUCCES_MESSAGES.PATIENT_UPDATED;
  }

  async updateCognitiveEvaluation(
    id: string,
    updateCognitiveEvaluation: UpdateConginitiveEvaluationDto,
  ) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['cognitiveEvaluation'],
    });

    if (!patient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    if (!patient.cognitiveEvaluation) {
      throw new NotFoundException(
        PATIENT_ERROR_MESSAGES.COG_EVALUATION_NOT_FOUND,
      );
    }

    Object.assign(patient.cognitiveEvaluation, updateCognitiveEvaluation);
    await this.cogEvaluationRepository.save(patient.cognitiveEvaluation);
    return PATIENT_SUCCES_MESSAGES.EVALUTAION_COG_UPDATED;
  }

  async remove(id: Patient['id']) {
    const foundPatient = await this.findOneWithoutFormat(id);
    await this.patientRepository.remove(foundPatient);
    return PATIENT_SUCCES_MESSAGES.PATIENT_DELETED;
  }

  //---Auxiliar functions
  private async findOneWithoutFormat(id: string) {
    const foundPatient = await this.patientRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundPatient)
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    return foundPatient;
  }

  private async findOneWithRelations(id: string) {
    const foundPatient = await this.patientRepository.findOne({
      where: { id },
      relations: [
        'conditions',
        'currentMedications',
        'familyBackground',
        'familyBackground.familyMemberBackgrounds',
        'symptomsPresent',
        'cognitiveEvaluation',
      ],
    });

    if (!foundPatient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    return foundPatient;
  }
}
