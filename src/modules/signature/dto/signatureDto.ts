import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { XMLDto } from './xmlDto';

export class SignatureDto {
  @IsString()
  @ApiProperty()
  readonly version: string = '1.0';

  @IsString()
  @ApiProperty()
  readonly method: string = 'XML.verify';

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly companyId?: string = '';

  @ApiProperty()
  @ValidateNested()
  @Type(() => XMLDto)
  params: XMLDto;
}
