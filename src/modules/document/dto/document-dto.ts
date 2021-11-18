import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { CompanyDto } from '../../company/dto/company-dto';
import type { DocumentEntity } from '../document.entity';

export class DocumentDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsString()
  body: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  company?: CompanyDto;

  constructor(
    document: DocumentEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(document);
    this.name = document.name;
    this.status = document.status;
    this.body = document.body;
    this.isActive = options?.isActive;
    this.company = document.company;
  }
}
