import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { AutoService } from './auto.service';
import { AutoDto } from './dto/auto.dto';
import { AutoListDto } from './dto/autoList.dto';
import { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
@Controller('auto')
@ApiTags('auto')
export class AutoController {
  constructor(public readonly autoService: AutoService) {}
  @Post()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create iban in external service',
    type: IbanAccountServiceDto,
  })
  addAutoAccount(@Body() autoDto: AutoDto) {
    return this.autoService.addAutoAccount(autoDto);
  }
  @Delete()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  deleteAutoAccount(@Body() autoDto: AutoDto): Promise<ISearchAccountResponse> {
    return this.autoService.deleteAutoAccount(autoDto);
  }
  @Get()
  @Auth(RoleType.USER)
  @HttpCode(HttpStatus.OK)
  listAuto(@Query('accountNumber') autoList: AutoListDto) {
    return this.autoService.getListAutoAccount(autoList);
  }
}
