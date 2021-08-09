import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIBAN,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CompanyEntity } from '../company.entity';

export class CompanyDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  bin: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  constructor(
    company: CompanyEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(company);
    this.name = company.name;
    this.bin = company.bin;
    this.isActive = options?.isActive;
  }
}
