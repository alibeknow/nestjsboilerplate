import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

import { Trim } from '../../../decorators/transforms.decorator';

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
  @IsOptional()
  @IsNumber()
  idn: string;

  @ApiProperty()
  @Column()
  @IsOptional()
  middleName: string;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  @Column()
  company?: any;
}
