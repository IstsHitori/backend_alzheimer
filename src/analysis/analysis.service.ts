import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis, Image, ImageAnalysis } from './entities';
import { Patient } from 'src/patient/entities';
import { ANALYSIS_SUCCESS_MESSAGES } from './constants';
import { PATIENT_ERROR_MESSAGES } from 'src/patient/constants';
import { ActivityService } from 'src/activity/activity.service';
import { ACTIVITY_TYPE } from 'src/activity/constants/enum-values';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(ImageAnalysis)
    private imageAnalysisRepository: Repository<ImageAnalysis>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly activityService: ActivityService,
  ) {}

  async create(createAnalysisDto: CreateAnalysisDto, userId: number) {
    const { patientId, imageAnalysis } = createAnalysisDto;

    // Verificar que el paciente existe
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    // Crear la sesión de análisis
    const analysis = this.analysisRepository.create({
      patient,
      user: {
        id: userId,
      },
    });

    const savedAnalysis = await this.analysisRepository.save(analysis);

    // Crear los análisis individuales de cada imagen
    const imageAnalysisEntities: ImageAnalysis[] = [];

    for (const imgAnalysisDto of imageAnalysis) {
      // Buscar si la imagen ya existe por URL
      let image = await this.imageRepository.findOne({
        where: { imageUrl: imgAnalysisDto.imageUrl },
      });

      // Si no existe, crear la imagen
      if (!image) {
        image = this.imageRepository.create({
          imageUrl: imgAnalysisDto.imageUrl,
          fileName: imgAnalysisDto.fileName,
        });
        await this.imageRepository.save(image);
      }

      // Crear el análisis de la imagen
      const imageAnalysis = this.imageAnalysisRepository.create({});

      imageAnalysisEntities.push(imageAnalysis);
    }

    // Guardar todos los análisis de imágenes
    await this.imageAnalysisRepository.save(imageAnalysisEntities);

    //Generar las actividades

    for (const index of imageAnalysisEntities) {
      const activity = {
        title: `Análisis completado - Paciente: ${patient.fullName}`,
        type: ACTIVITY_TYPE.ANALYSIS,
        description: `Resultado: ${index.diagnosis}`,
        user: {
          id: userId,
        },
      };
      await this.activityService.create(activity);
    }

    // Retornar el análisis completo
    return await this.findOne(savedAnalysis.id);
  }

  async findAll() {
    return await this.analysisRepository.find({
      relations: ['patient', 'user', 'imageAnalysis', 'imageAnalysis.image'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPatient(patientId: number) {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES.PATIENT_NOT_FOUND);
    }

    return await this.analysisRepository.find({
      where: { patient: { id: patientId } },
      relations: ['user', 'imageAnalysis', 'imageAnalysis.image'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const analysis = await this.analysisRepository.findOne({
      where: { id },
      relations: ['patient', 'user', 'imageAnalysis', 'imageAnalysis.image'],
    });

    if (!analysis) {
      throw new NotFoundException(`Analysis with ID ${id} not found`);
    }

    return analysis;
  }

  async remove(id: number) {
    const analysis = await this.findOne(id);
    await this.analysisRepository.remove(analysis);
    return { message: ANALYSIS_SUCCESS_MESSAGES.ANALYSIS_DELETED };
  }
}
