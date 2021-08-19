import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
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

  constructor(
    document: DocumentEntity,
    options?: Partial<{ isActive: boolean }>,
  ) {
    super(document);
    this.name = document.name;
    this.status = document.status;
    this.body = document.body;
    this.isActive = options?.isActive;
  }
}
