import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import { IbanService } from './iban.service';

@Controller('iban')
export class IbanController {
  constructor(public readonly ibanService: IbanService) {}
  @Post()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create iban in external service',
    type: IbanAccountServiceDto,
  })
  async verifySignature(@Body() ibanAccountDto: IbanAccountServiceDto) {
    const result = await this.ibanService.createIbanAccount(ibanAccountDto);
    return result;
  }
}
