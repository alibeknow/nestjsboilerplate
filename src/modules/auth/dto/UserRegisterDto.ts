import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Column } from 'typeorm';

import { Trim } from '../../../decorators/transforms.decorator';
import { SignatureDto } from '../../signature/dto/signatureDto';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly lastName: string;
  @ApiProperty()
  @Column()
  @IsString()
  idn: string;

  @ApiProperty()
  @Column()
  @IsEmail()
  @IsOptional()
  email: string;
  @ApiProperty()
  @Column()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @Column()
  company?: any;
}
