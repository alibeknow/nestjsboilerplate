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

  constructor(user: DocumentEntity, options?: Partial<{ isActive: boolean }>) {
    super(user);
    this.uid = user.uid;
    this.name = user.name;
    this.status = user.status;
    this.dateCreate = user.dateCreate;
    this.isActive = options?.isActive;
  }
}
