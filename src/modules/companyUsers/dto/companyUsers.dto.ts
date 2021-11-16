import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CompanyUsersEntity } from '../companyUser.entity';

export class CompanyUsersDto extends AbstractDto {
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
  constructor(companyUsers: CompanyUsersEntity) {
    super(companyUsers);
    this.firstName = companyUsers.firstName;
    this.lastName = companyUsers.lastName;
    this.middleName = companyUsers.middleName;
    this.email = companyUsers.email;
    this.position = companyUsers.position;
    this.operatorDoc = companyUsers.operatorDoc;
  }
}
