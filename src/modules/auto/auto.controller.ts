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
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { NotValidCertException } from '../../exceptions/bad-request-ncanode';
import { UtilsService } from '../../shared/services/utils.service';
import type { ISearchAccountResponse } from '../iban/interfaces/ISearchAccountResponse';
import { SignatureService } from '../signature/signature.service';
import { AutoService } from './auto.service';
import { AutoDto } from './dto/auto.dto';
import { AutoArray } from './dto/autoArray.dto';
import { AutoListDto } from './dto/autoList.dto';
@Controller('auto')
@ApiTags('auto')
export class AutoController {
  constructor(
    public readonly autoService: AutoService,
    public readonly signatureService: SignatureService,
    public readonly utilsService: UtilsService,
  ) {}
  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
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
      companyType: req.user.company.company_type,
    });
    if (isValid) {
      return this.autoService.addAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Delete()
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
      companyType: req.user.company.company_type,
    });
    if (isValid) {
      return this.autoService.deleteAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Post('getList')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  listAuto(@Body() autoList: AutoListDto) {
    return this.autoService.getListAutoAccount(autoList);
  }
}
