import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CompanyUsersEntity } from '../companyUser.entity';

export class CompanyUsersDto2 {
  @ApiPropertyOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  middleName: string;

  @ApiPropertyOptional()
  @IsEmail()
  email: string;
  @ApiPropertyOptional()
  @IsString()
  position: string;
  @ApiPropertyOptional()
  @IsString()
  operatorDoc: string;
}
