import { ApiProperty } from '@nestjs/swagger';

import { CompanyDto } from '../../company/dto/company-dto';
import { UserDto } from '../../user/dto/user-dto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;
  @ApiProperty({ type: CompanyDto })
  company: CompanyDto;

  constructor(user: UserDto, token: TokenPayloadDto, company: CompanyDto) {
    this.user = user;
    this.token = token;
    this.company = company;
  }
}
