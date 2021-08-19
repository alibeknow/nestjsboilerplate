import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import type { PageDto } from '../../common/dto/page.dto';
import { Auth } from '../../decorators/http.decorators';
import type { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company-dto';
import { CompanyPageOptionsDto } from './dto/companyPageOptionsDto';

@Controller('company')
export class CompanyController {
  constructor(readonly companyService: CompanyService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth(RoleType.ADMIN)
  @ApiOkResponse({
    type: CompanyDto,
    description: 'Document info with access token',
  })
  getAllCompanies(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CompanyPageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    return this.companyService.findAll(pageOptionsDto);
  }
}
