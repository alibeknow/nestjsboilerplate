import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { AccountDto } from './dto/account-entity.dto';
import { ArrayAccounts } from './dto/accounts.array.dto';
import { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import { IbanService } from './iban.service';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
@Controller('iban')
@ApiTags('iban')
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
  createIban(@Body() ibanAccountDto: IbanAccountServiceDto) {
    return this.ibanService.createIbanAccount(ibanAccountDto);
  }
  @Get()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  searchBin(@Query('xin') bin: string): Promise<ISearchAccountResponse> {
    return this.ibanService.searchAccountByBin(bin);
  }
  @Post('setMain')
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.ACCEPTED)
  setMain(@Query('iban') iban: string, @Query('bin') companyId: string) {
    return this.ibanService.setMainAccount(iban, companyId);
  }
  @Post('create')
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.ACCEPTED)
  createAccounts(@Body() accounts: ArrayAccounts) {
    return this.ibanService.addAccounts(accounts);
  }
}
