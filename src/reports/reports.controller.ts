import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLE } from 'src/user/constants';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/user/entities/user.entity';

@Auth(ROLE.ADMIN, ROLE.DOCTOR)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto, @GetUser() user: User) {
    return this.reportsService.create(createReportDto, user);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
