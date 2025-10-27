import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis, Image, ImageAnalysis } from './entities';
import { Patient } from 'src/patient/entities';

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
  ) {}
  create(createAnalysisDto: CreateAnalysisDto) {
    return 'This action adds a new analysis';
  }

  findAll() {
    return `This action returns all analysis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysis`;
  }

  update(id: number, updateAnalysisDto: UpdateAnalysisDto) {
    return `This action updates a #${id} analysis`;
  }

  remove(id: number) {
    return `This action removes a #${id} analysis`;
  }
}
