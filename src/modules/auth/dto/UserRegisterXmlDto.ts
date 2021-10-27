import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Column } from 'typeorm';

import { CompanyType } from '../../../common/constants/company-type';
import { SignatureDto } from '../../signature/dto/signatureDto';

export class UserRegisterXmlDto {
  @ApiProperty()
  @Column()
  @IsString()
  idn: string;
  @ApiProperty()
  @Column()
  @IsString()
  bin: string;

  @ApiProperty()
  @Column()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CompanyType)
  companyType: CompanyType;

  @ApiProperty()
  @Column()
  company?: any;

  @ApiProperty()
  @ValidateNested()
  @Type(() => SignatureDto)
  signedXml: SignatureDto;
}
