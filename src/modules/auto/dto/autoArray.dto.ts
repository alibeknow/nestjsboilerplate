import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { SignatureDto } from '../../signature/dto/signatureDto';
import { XMLDto } from '../../signature/dto/xmlDto';
import { AutoDto } from './auto.dto';

export class AutoArray {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AutoDto)
  vehicles: AutoDto[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => XMLDto)
  signature: SignatureDto;
}
