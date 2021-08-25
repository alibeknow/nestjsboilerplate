import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Status } from '../../common/constants/status';
import { Auth } from '../../decorators/http.decorators';
import { DocumentService } from '../document/document.service';
import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
export class SignatureController {
  constructor(
    public readonly signatureService: SignatureService,
    public readonly documentService: DocumentService,
  ) {}

  @Auth(RoleType.USER)
  @Post('document')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify document Signature XML',
    type: SignatureDto,
  })
  async verifyDocument(@Body() signatureData: SignatureDto, @Req() request) {
    const companyId = request.user.company.id;
    const { valid, subject } = await this.signatureService.verifySignature(
      signatureData,
    );
    if (
      subject.bin === request.user.company.bin &&
      subject.iin === request.user.idn &&
      valid
    ) {
      const {
        params: { xml },
      } = signatureData;
      const changedDoc = await this.documentService.changeStatus(
        Status.SIGNED,
        companyId,
      );
      const document = await this.documentService.getDocs(companyId);

      await this.signatureService.createSignature({
        body: xml,
        document: document[0].id,
      });

      return changedDoc;
    }
    return BadRequestException.createBody({
      message: 'Пожалуйста используйте верную подпись',
      statusCode: 416,
    });
  }

  @Auth(RoleType.ADMIN)
  @Post('operator')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify document Signature XML',
    type: SignatureDto,
  })
  async signedDocument(@Body() signatureData: SignatureDto) {
    const { companyId } = signatureData;
    const { valid, subject } = await this.signatureService.verifySignature(
      signatureData,
    );
    if (subject.bin === '140241014416' && valid) {
      const document = await this.documentService.getDocs(companyId);
      const {
        params: { xml },
      } = signatureData;
      const changedDoc = await this.documentService.changeStatus(
        Status.APPROVED,
        companyId,
      );
      await this.signatureService.createSignature({
        body: xml,
        document: document[0].id,
      });

      return changedDoc;
    }
    return BadRequestException.createBody({
      message: 'Пожалуйста используйте верную подпись',
      statusCode: 416,
    });
  }
}
