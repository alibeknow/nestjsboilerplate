import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CompanyDto } from '../../company/dto/company-dto';
import { UserDto } from '../../user/dto/user-dto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class OperatorLoginDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
