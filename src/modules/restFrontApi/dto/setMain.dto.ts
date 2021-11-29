import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SetMainDto {
  @ApiProperty()
  @IsString()
  iban: string;
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  companyId: string;

  @ApiProperty()
  @IsString()
  xin: string;
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
  @IsString()
  contractNumber = '№135/20 от 11.07.2021';
}
