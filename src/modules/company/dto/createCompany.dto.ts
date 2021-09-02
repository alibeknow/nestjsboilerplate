import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CompanyType } from '../../../common/constants/company-type';

export class CreateCompanyDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  bin: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CompanyType)
  companyType: CompanyType;
}
