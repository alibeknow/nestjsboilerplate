import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
  //@Auth(RoleType.USER)
  async SignedContract(
    @Body() contractDto: SignedContractDto,
    @Req() req,
    @Res() res,
  ) {
    //contractDto.companyId = req.user.company.id;
    const pdfData = await this.contractService.SignedContract(contractDto);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
    });
    res.end(pdfData);
  }
}
