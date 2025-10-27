import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLE } from 'src/user/constants';

@Auth(ROLE.ADMIN, ROLE.DOCTOR)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  create(@Body() createAnalysisDto: CreateAnalysisDto, @GetUser() user: User) {
    return this.analysisService.create(createAnalysisDto, user.id);
  }

  @Get()
  findAll() {
    return this.analysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.findOne(id);
  }

  @Get('patient/:id')
  findOneByPatientId(@Param('id', ParseIntPipe) patientId: number) {
    return this.analysisService.findByPatient(patientId);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateAnalysisDto: UpdateAnalysisDto,
  // ) {
  //   return this.analysisService.update(id, updateAnalysisDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.remove(id);
  }
}
