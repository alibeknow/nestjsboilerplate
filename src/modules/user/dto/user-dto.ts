import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { CompanyDto } from '../../company/dto/company-dto';
import type { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  idn: string;

  @ApiPropertyOptional()
  isActive: boolean;

  @ApiPropertyOptional()
  company: CompanyDto;

  constructor(user: UserEntity, options?: Partial<{ isActive: boolean }>) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.idn = user.idn;
    this.isActive = options?.isActive;
  }
}
