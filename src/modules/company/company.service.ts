import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import type { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import type { CompanyPageOptionsDto } from './dto/companyPageOptionsDto';
import type { CreateCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(public readonly companyRepository: CompanyRepository) {}

  async create(companyDto: CreateCompanyDto) {
    await this.companyRepository.save(companyDto);
    const returnedDto = this.companyRepository.create(companyDto).toDto();
    return returnedDto;
  }
  async findAll(
    pageOptionsDto: CompanyPageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('company');
    const status = pageOptionsDto.status;
    if (status) {
      const { items, pageMetaDto } = await queryBuilder
        .innerJoinAndSelect(
          'company.documents',
          'documents',
          '"documents"."status" in (:status)',
          { status },
        )
        .paginate(pageOptionsDto);
      return { data: items, meta: pageMetaDto };
    } else {
      const { items, pageMetaDto } = await queryBuilder
        .innerJoinAndSelect('company.documents', 'documents')
        .paginate(pageOptionsDto);

      return { data: items, meta: pageMetaDto };
    }
  }

  async findOrCreate(companyDto: CreateCompanyDto): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({
      where: { bin: companyDto.bin },
    });
    if (!company) {
      const resultCompany = this.companyRepository.create(companyDto);
      await this.companyRepository.save(resultCompany);
      return resultCompany;
    }
    return company;
  }
  getByBin(bin: string) {
    return this.companyRepository.findOne({
      where: {
        bin,
      },
    });
  }
}
