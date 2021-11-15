import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

import { SignatureDto } from '../../signature/dto/signatureDto';
import { XMLDto } from '../../signature/dto/xmlDto';

export class AutoDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsString()
  licencePlate: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => XMLDto)
  signature: SignatureDto;
}
