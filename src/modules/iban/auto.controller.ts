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
import { NotValidCertException } from '../../exceptions/not-valid-cert.eception';
import { SignatureService } from '../signature/signature.service';
import { AutoService } from './auto.service';
import { AutoDto } from './dto/auto.dto';
import { AutoListDto } from './dto/autoList.dto';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
@Controller('auto')
@ApiTags('auto')
export class AutoController {
  constructor(
    public readonly autoService: AutoService,
    public readonly signatureService: SignatureService,
  ) {}
  @Post()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create auto in external service',
    type: AutoDto,
  })
  async addAutoAccount(@Body() autoDto: AutoDto, @Req() req) {
    const signatureData = await this.signatureService.verifySignature(
      autoDto.signature,
    );
    if (
      signatureData.valid &&
      signatureData.subject.bin &&
      signatureData.subject.bin === req.user.company.bin &&
      signatureData.subject.iin === req.user.idn
    ) {
      return this.autoService.addAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Delete()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  async deleteAutoAccount(
    @Body() autoDto: AutoDto,
    @Req() req: any,
  ): Promise<ISearchAccountResponse> {
    const signatureData = await this.signatureService.verifySignature(
      autoDto.signature,
    );
    if (
      signatureData.valid &&
      signatureData.subject.bin &&
      signatureData.subject.bin === req.user.company.bin &&
      signatureData.subject.iin === req.user.idn
    ) {
      return this.autoService.deleteAutoAccount(autoDto);
    } else {
      throw new NotValidCertException(
        'Данные текущего пользователя и сертификата не совпадают',
      );
    }
  }
  @Post('getList')
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  listAuto(@Body() autoList: AutoListDto) {
    return this.autoService.getListAutoAccount(autoList);
  }
}
