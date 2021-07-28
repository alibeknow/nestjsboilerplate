import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  bin: string;

  @ApiPropertyOptional()
  isActive: boolean;

  constructor(
    company: CompanyEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(company);
    this.name = company.name;
    this.bin = company.bin;
    this.createdAt = company.createdAt;
    this.isActive = options?.isActive;
  }
}
