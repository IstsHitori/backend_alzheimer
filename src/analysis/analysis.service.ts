import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Analysis, Image, ImageAnalysis } from './entities';
import { Patient } from 'src/patient/entities';
import { ANALYSIS_SUCCESS_MESSAGES } from './constants';
import { ActivityService } from 'src/activity/activity.service';
import { ACTIVITY_TYPE } from 'src/activity/constants/enum-values';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly activityService: ActivityService,
  ) {}

  async create(createAnalysisDto: CreateAnalysisDto, userId: string) {
    return await this.dataSource.transaction(async manager => {
      const { patientId, imageAnalysis } = createAnalysisDto;

      const patient = await this.findOnePatientById(patientId);

      // Create and save analysis entity first
      const analysis = manager.create(Analysis, {
        patient,
        user: {
          id: userId,
        },
      });
      const savedAnalysis = await manager.save(Analysis, analysis);

      // Create individual analyses of each image with the saved analysis
      const imageAnalysisEntities = await this.createImageAnalysis(
        imageAnalysis,
        savedAnalysis,
        manager,
      );

      //Save all image's analysis
      await manager.save(ImageAnalysis, imageAnalysisEntities);

      //Create and save activities
      await this.saveActivities(imageAnalysisEntities, patient, userId);

      // Return complete analysis with relations
      return await manager.findOne(Analysis, {
        where: { id: savedAnalysis.id },
        relations: ['patient', 'user', 'imageAnalysis', 'imageAnalysis.image'],
        select: {
          user: {
            id: true,
            name: true,
            userName: true,
            role: true,
          },
        },
      });
    });
  }

  async findAll() {
    return await this.analysisRepository.find({
      relations: ['patient', 'user', 'imageAnalysis', 'imageAnalysis.image'],
      select: {
        user: {
          id: true,
          name: true,
          userName: true,
          role: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findAnalysiesByPatient(patientId: Patient['id']) {
    await this.findOnePatientById(patientId);

    return await this.analysisRepository.find({
      where: { patient: { id: patientId } },
      relations: ['user', 'imageAnalysis', 'imageAnalysis.image'],
      select: {
        user: {
          id: true,
          name: true,
          userName: true,
          role: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const analysis = await this.analysisRepository.findOne({
      where: { id },
      relations: ['patient', 'user', 'imageAnalysis', 'imageAnalysis.image'],
      select: {
        user: {
          id: true,
          name: true,
          userName: true,
          role: true,
        },
      },
    });

    if (!analysis) {
      throw new NotFoundException(`Analysis with ID ${id} not found`);
    }

    return analysis;
  }

  async remove(id: number) {
    const analysis = await this.findOne(id);
    await this.analysisRepository.remove(analysis);
    return ANALYSIS_SUCCESS_MESSAGES.ANALYSIS_DELETED;
  }

  //--- Auxiliar funtions
  private async findOnePatientById(patientId: Patient['id']) {
    const patient = await this.patientRepository.findOneBy({ id: patientId });
    if (!patient)
      throw new NotFoundException(
        `Paciente con id: ${patientId} no encontrado`,
      );

    return patient;
  }

  private async saveActivities(
    imageAnalysisEntities: ImageAnalysis[],
    patient: Patient,
    userId: string,
  ) {
    for (const index of imageAnalysisEntities) {
      const activity = {
        title: `Análisis completado - Paciente: ${patient.fullName}`,
        type: ACTIVITY_TYPE.ANALYSIS,
        description: `Resultado: ${index.diagnosis}`,
        userId,
      };
      await this.activityService.create(activity);
    }
  }

  private async createImageAnalysis(
    imageAnalysis: CreateAnalysisDto['imageAnalysis'],
    savedAnalysis: Analysis,
    manager: EntityManager,
  ) {
    const imageAnalysisEntities: ImageAnalysis[] = [];

    for (const imgAnalysisDto of imageAnalysis) {
      // Search if the image already exist
      let image = await manager.findOne(Image, {
        where: { imageUrl: imgAnalysisDto.imageUrl },
      });

      // If does'nt exist, create the image
      if (!image) {
        image = await this.createAndSaveImage(
          imgAnalysisDto.imageUrl,
          imgAnalysisDto.fileName,
          manager,
        );
      }

      // Create image's analysis
      const imageAnalysis = manager.create(ImageAnalysis, {
        image,
        analysis: savedAnalysis,
        diagnosis: imgAnalysisDto.diagnosis,
        nonDemented: imgAnalysisDto.nonDemented,
        veryMildDemented: imgAnalysisDto.veryMildDemented,
        mildDemented: imgAnalysisDto.mildDemented,
        moderateDemented: imgAnalysisDto.moderateDemented,
      });

      imageAnalysisEntities.push(imageAnalysis);
    }

    return imageAnalysisEntities;
  }

  private async createAndSaveImage(
    imageUrl: string,
    fileName: string,
    manager: EntityManager,
  ) {
    const image = manager.create(Image, { imageUrl, fileName });
    return await manager.save(Image, image);
  }
}
