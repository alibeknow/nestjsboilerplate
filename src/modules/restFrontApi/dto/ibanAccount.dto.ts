import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class IbanAccountDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  bin: string;
  @ApiProperty()
  @IsString()
  companyName: string;
  @ApiProperty()
  @IsString()
  mobileNumber: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  address = '';
}
