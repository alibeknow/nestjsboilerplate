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
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { SignedContractDto } from './dto/signedContract.dto';
@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(public readonly contractService: ContractService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Auth(RoleType.ADMIN)
  @ApiOkResponse({
    type: ContractDto,
    description: 'Document info with access token',
  })
  GenerateContract(@Body() contract: ContractDto, @Req() req): Promise<Buffer> {
    return this.contractService.GenerateContract(contract);
  }
  @Post()
  @HttpCode(HttpStatus.OK)
  @Auth(RoleType.ADMIN)
  SignedContract(
    @Body() contractDto: SignedContractDto,
    @Req() req,
  ): Promise<Buffer> {
    return this.contractService.SignedContract(contractDto, req);
  }
}
