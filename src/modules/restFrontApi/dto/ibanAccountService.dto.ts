import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class IbanAccountServiceDto {
  @ApiProperty()
  @IsString()
  xin: string;
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
  @IsString()
  contractNumber = '№135/20 от 11.07.2021';
  @IsString()
  registrationDate: string;
  @IsString()
  expirationDate: string;
}
