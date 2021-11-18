import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { AssetsEntity } from '../assets.entity';
import { DocumentDto } from './../../document/dto/document-dto';
export class AssetsDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  path: string;

  @ApiPropertyOptional()
  @IsOptional()
  document?: DocumentDto;

  constructor(assets: AssetsEntity) {
    super(assets);
    this.name = assets.name;
    this.path = assets.path;
    this.document = assets.document;
  }
}
