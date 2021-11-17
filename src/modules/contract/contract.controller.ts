import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
  async SignedContract(@Body() contractDto: SignedContractDto, @Req() req) {
    contractDto.companyId = req.user.company.id;
    contractDto.bin = req.user.company.bin;
    const date = new Date();

    contractDto.contractDate = date.getUTCDate().toString();
    await this.contractService.SignedContract(contractDto);

    return 'OK';
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth(RoleType.USER)
  downloadContract(@Req() req, @Res() res) {
    const companyId: string =
      req.user?.company?.id || 'adb21fb4-0446-4ebf-9a67-78344357362a';
    const pdfData = this.contractService.getPdf(companyId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
    });
    res.end(pdfData);
  }
}
