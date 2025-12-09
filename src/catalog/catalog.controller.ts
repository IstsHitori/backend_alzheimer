import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLE } from 'src/user/constants';
import { CatalogService } from './catalog.service';

@Controller('catalog')
@Auth(ROLE.ADMIN, ROLE.DOCTOR)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('eps')
  findAllEps() {
    return this.catalogService.findAllEps();
  }

  @Get('medications')
  findAllCum(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.catalogService.findAllCum(limit, offset);
  }

  @Get('medications/search')
  findCum(@Query('search') searchParam: string) {
    return this.catalogService.findCumBySearch(searchParam);
  }

  @Get('conditions')
  findAllCIE10() {
    return this.catalogService.findAllCIE10();
  }
  @Get('conditions/search')
  findCIE10(@Query('search') searchParam: string) {
    return this.catalogService.findCIE10BySearch(searchParam);
  }
}
