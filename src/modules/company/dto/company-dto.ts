import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIBAN,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { DocumentEntity } from '../../document/document.entity';
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

  @ApiPropertyOptional()
  @IsOptional()
  //@ValidateNested()
  documents: DocumentEntity[];

  constructor(
    company: CompanyEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(company);
    this.name = company.name;
    this.bin = company.bin;
    this.documents = company.documents;
    this.isActive = options?.isActive;
  }
}
