import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Status } from '../../common/constants/status';
import type { PageDto } from '../../common/dto/page.dto';
import { Auth } from '../../decorators/http.decorators';
import type { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company-dto';
import { CompanyPageOptionsDto } from './dto/companyPageOptionsDto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(readonly companyService: CompanyService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.ADMIN])
  @ApiQuery({ enum: Status, name: 'status' })
  getAllCompanies(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CompanyPageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    return this.companyService.findAll(pageOptionsDto);
  }
}
