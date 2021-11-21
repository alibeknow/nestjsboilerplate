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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
// eslint-disable-next-line unicorn/import-style
import { extname } from 'path';

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
  @Auth([RoleType.ADMIN, RoleType.USER])
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
  @Auth([RoleType.USER, RoleType.ADMIN])
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array.from({ length: 32 })
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
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
  @Auth([RoleType.USER, RoleType.ADMIN])
  downloadContract(
    @Query('companyid') companyid: string,
    @Req() req,
    @Res() res,
  ) {
    const companyId: string = companyid || req.user?.company?.id;

    const pdfData = this.contractService.getPdf(companyId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
    });
    res.end(pdfData);
  }

  @Get('getAssets')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  getAssets(@Query('documentId') documentId: string) {
    return this.contractService.getAssets(documentId);
  }

  @Get('downloadAssets')
  @Auth([RoleType.USER, RoleType.ADMIN])
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
