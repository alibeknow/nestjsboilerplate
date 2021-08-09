import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import { CompanyRepository } from './company.repository';
import type { CompanyDto } from './dto/company-dto';
import type { CompanyPageOptionsDto } from './dto/companyPageOptionsDto';
import type { CreateCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(public readonly companyRepository: CompanyRepository) {}

  async create(companyDto: CreateCompanyDto) {
    await this.companyRepository.save(companyDto);
    const returnedDto = await this.companyRepository.create(companyDto).toDto();
    return returnedDto;
  }

  async findAll(
    pageOptionsDto: CompanyPageOptionsDto,
  ): Promise<PageDto<CompanyDto>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('company');

    const { items, pageMetaDto } = await queryBuilder
      .leftJoinAndSelect('company.documents', 'documents')
      .paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }

  async findOrCreate(companyDto: CreateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { bin: companyDto.bin },
    });
    return !company ? company : this.companyRepository.save(companyDto);
  }
}
