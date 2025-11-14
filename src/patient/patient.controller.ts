import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLE } from 'src/user/constants';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateConginitiveEvaluationDto } from './dto/update-cognitive-evaluation.dto';

@Auth(ROLE.ADMIN, ROLE.DOCTOR)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @GetUser() user: User) {
    return this.patientService.create(createPatientDto, user.id);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @GetUser() user: User,
  ) {
    return this.patientService.update(id, updatePatientDto, user.id);
  }

  @Patch('evaluation/:id')
  updateCoginitiveEvaluation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCoginitiveEvaluation: UpdateConginitiveEvaluationDto,
  ) {
    return this.patientService.updateCognitiveEvaluation(
      id,
      updateCoginitiveEvaluation,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.remove(id);
  }
}
