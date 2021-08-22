import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class IbanAccountServiceDto {
  @ApiProperty()
  @IsString()
  bin: string;
  @ApiProperty()
  @IsString()
  companyName: string;
  @ApiProperty()
  @IsString()
  @IsMobilePhone()
  mobileNumber: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  address = '';
}
