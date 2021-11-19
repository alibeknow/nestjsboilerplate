import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { CompanyDto } from '../../company/dto/company-dto';
import type { AssetsDto } from '../../contract/dto/assets.dto';
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
  @IsString()
  asset: string;

  @ApiPropertyOptional()
  @IsString()
  comments: string;
  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  enableResign: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  company?: CompanyDto;

  @ApiPropertyOptional()
  @IsOptional()
  assets?: AssetsDto[];
  constructor(
    document: DocumentEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(document);
    this.name = document.name;
    this.enableResign = document.enableResign;
    this.status = document.status;
    this.body = document.body;
    this.asset = document.asset;
    this.assets = document.assets;
    this.isActive = options?.isActive;
    this.company = document.company;
    this.comments = document.comments;
  }
}
