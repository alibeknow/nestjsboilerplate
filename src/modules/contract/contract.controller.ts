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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { AssetsRepository } from './assets.repository';
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
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/' }))
  async SignedContract(
    @UploadedFiles() files: Express.Multer.File,
    @Body() contractDto: SignedContractDto,
    @Req() req,
  ) {
    contractDto.companyId = req.user.company.id;
    contractDto.bin = req.user.company.bin;
    contractDto.companyName = req.user.company.name;
    const date = new Date();
    contractDto.contractDate = date.getUTCDate().toString();
    await this.contractService.SignedContract(contractDto, files);
    return { success: 'ok' };
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

  @Get('getAssets')
  @HttpCode(HttpStatus.OK)
  getAssets(@Query('documentId') documentId: string) {
    return this.contractService.getAssets(documentId);
  }

  @Get('downloadAssets')
  @HttpCode(HttpStatus.OK)
  async downloadAssets(@Query('assetId') assetId: string, @Res() res) {
    const rresult = await this.contractService.downloadAssets(assetId);
    res.set({
      'Content-Type': rresult.mimeType,
      'Content-Disposition': `attachment; filename=${rresult.name}`,
    });
    res.end(rresult.file);
  }
}
