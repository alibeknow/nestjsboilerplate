import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
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

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  //@Auth(RoleType.ADMIN)
  @ApiOkResponse({
    type: ContractDto,
    description: 'Document info with access token',
  })
  async GenerateContract(@Body() contract: ContractDto, @Res() res: any) {
    const pdfData = await this.contractService.GenerateContract(contract);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
    });
    res.end(pdfData);
  }
  @Post()
  @HttpCode(HttpStatus.OK)
  @Auth(RoleType.USER)
  async SignedContract(
    @Body() contractDto: SignedContractDto,
    @Req() req,
    @Res() res,
  ) {
    const pdfData = await this.contractService.SignedContract(contractDto);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
    });
    res.end(pdfData);
  }
}
