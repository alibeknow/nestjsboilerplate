import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { AccountDto } from './dto/account-entity.dto';
import { ArrayAccounts } from './dto/accounts.array.dto';
import { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import { SetMainDto } from './dto/setMain.dto';
import { IbanService } from './iban.service';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
@Controller('iban')
@ApiTags('iban')
export class IbanController {
  constructor(public readonly ibanService: IbanService) {}
  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create iban in external service',
    type: IbanAccountServiceDto,
  })
  createIban(@Body() ibanAccountDto: IbanAccountServiceDto, @Req() req) {
    ibanAccountDto.xin = req.user.company.bin as string;
    return this.ibanService.createIbanAccount(ibanAccountDto);
  }
  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  searchBin(@Req() req): Promise<ISearchAccountResponse> {
    const bin = req.user.company.bin as string;
    return this.ibanService.searchAccountByBin(bin);
  }
  @Post('setMain')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.ACCEPTED)
  setMain(@Body() setMain: SetMainDto, @Req() req) {
    setMain.companyId = req.user.company.id;
    return this.ibanService.setMainAccount(setMain);
  }
  @Post('create')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.ACCEPTED)
  createAccounts(@Body() accounts: ArrayAccounts, @Req() req) {
    return this.ibanService.addAccounts(accounts, req);
  }
  @Get('getmain')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  getMainAccount(@Req() req) {
    const companyId = req.user.company.id as string;
    return this.ibanService.getMainAccount(companyId);
  }
}
