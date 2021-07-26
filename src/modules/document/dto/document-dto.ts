import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { DocumentEntity } from '../document.entity';

export class DocumentDto extends AbstractDto {
  @ApiPropertyOptional()
  @IsUUID()
  uid: string;

  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsDate()
  dateCreate: Date;

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
    this.dateCreate = document.dateCreate;
    this.isActive = options?.isActive;
  }
}
