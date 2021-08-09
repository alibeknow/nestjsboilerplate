import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import { CompanyRepository } from './company.repository';
import type { CompanyDto } from './dto/company-dto';
import type { CompanyPageOptionsDto } from './dto/companyPageOptionsDto';
import type { CreateCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(public readonly companyRepository: CompanyRepository) {}

  create(companyDto: CreateCompanyDto) {
    return this.companyRepository.save(companyDto);
  }

  async findAll(
    pageOptionsDto: CompanyPageOptionsDto,
  ): Promise<PageDto<CompanyDto>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('company');
    const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }
}
