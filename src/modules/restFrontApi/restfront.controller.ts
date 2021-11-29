import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { NotValidCertException } from '../../exceptions/bad-request-ncanode';
import { LoggerInterceptor } from '../../interceptors/logger-interceptor.service';
import { UtilsService } from '../../shared/services/utils.service';
import { SignatureService } from '../signature/signature.service';
import { AccountDto } from './dto/account-entity.dto';
import { AccountFillpageDto } from './dto/accountfill.dto';
import { ArrayAccounts } from './dto/accounts.array.dto';
import { AutoDto } from './dto/auto.dto';
import { AutoArray } from './dto/autoArray.dto';
import { AutoListDto } from './dto/autoList.dto';
import { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import { SetMainDto } from './dto/setMain.dto';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
import { RestFrontApiService } from './restfront.service';
@Controller()
@ApiTags('restfronApi')
export class RestFrontController {
  constructor(
    public readonly restFrontService: RestFrontApiService,
    public readonly signatureService: SignatureService,
    public readonly utilsService: UtilsService,
  ) {}
  @Post('iban')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create iban in external service',
    type: IbanAccountServiceDto,
  })
  createIban(@Body() ibanAccountDto: IbanAccountServiceDto, @Req() req) {
    ibanAccountDto.xin = req.user.company.bin as string;
    return this.restFrontService.createIbanAccount(ibanAccountDto);
  }

  @Get('iban')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  searchBin(@Req() req): Promise<ISearchAccountResponse> {
    const bin = req.user.company.bin as string;
    return this.restFrontService.searchAccountByBin(bin);
  }

  @Get('iban/detail')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  searchAccountNumber(
    @Query('accountNumber') accountNumber: string,
    @Req() req,
  ): Promise<ISearchAccountResponse> {
    return this.restFrontService.searchAccountNumber(accountNumber);
  }

  @Post('iban/setMain')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.ACCEPTED)
  setMain(@Body() setMain: SetMainDto, @Req() req) {
    setMain.companyId = req.user.company.id;
    return this.restFrontService.setMainAccount(setMain);
  }
  @Post('iban/create')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.ACCEPTED)
  createAccounts(@Body() accounts: ArrayAccounts, @Req() req) {
    return this.restFrontService.addAccounts(accounts, req);
  }
  @Get('iban/getmain')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  getMainAccount(@Req() req) {
    const companyId = req.user.company.id as string;
    return this.restFrontService.getMainAccount(companyId);
  }
  @Post('iban/getDeposit')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  getFillAccount(@Body() fillAccount: AccountFillpageDto) {
    return this.restFrontService.fillAccount(fillAccount);
  }

  @Post('auto')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LoggerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create auto in external service',
    type: AutoDto,
  })
  async addAutoAccount(@Body() autoDto: AutoArray, @Req() req) {
    const signatureData = await this.signatureService.verifySignature(
      autoDto.signature,
    );
    const isValid = this.utilsService.validateSignature(signatureData, {
      bin: req.user.company.bin,
      idn: req.user.idn,
      companyType: req.user.company.companyType,
    });
    if (isValid) {
      return this.restFrontService.addAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Delete('auto')
  @UseInterceptors(LoggerInterceptor)
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  async deleteAutoAccount(
    @Body() autoDto: AutoArray,
    @Req() req: any,
  ): Promise<any> {
    const signatureData = await this.signatureService.verifySignature(
      autoDto.signature,
    );
    const isValid = this.utilsService.validateSignature(signatureData, {
      bin: req.user.company.bin,
      idn: req.user.idn,
      companyType: req.user.company.companyType,
    });
    if (isValid) {
      return this.restFrontService.deleteAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Post('auto/getList')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  listAuto(@Body() autoList: AutoListDto) {
    return this.restFrontService.getListAutoAccount(autoList);
  }
}
