import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { RoleType } from '../../common/constants/role-type';
import { Status } from '../../common/constants/status';
import { Auth } from '../../decorators/http.decorators';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { DocumentService } from '../document/document.service';
import { IbanService } from '../iban/iban.service';
import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
@ApiTags('signature')
export class SignatureController {
  constructor(
    public readonly signatureService: SignatureService,
    public readonly documentService: DocumentService,
    public readonly ibanService: IbanService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify document Signature XML',
    type: SignatureDto,
  })
  async getSignature(
    @Query('documentId') documentId: string,
  ): Promise<SignatureDto> {
    const signatures = await this.signatureService.getSignatureByDocumentId(
      documentId,
    );
    return signatures;
  }

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
        fio: subject.commonName,
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
  @Transactional()
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
        fio: subject.commonName,
        name: 'clientSignature',
      });
      const replacedforJson = subject.organization.replace(/(\\")/g, '');
      const data = await this.ibanService.createIbanAccount({
        address: 'mockDefaultAddress',
        companyName: replacedforJson,
        xin: subject.bin,
        email: subject.email,
        mobileNumber: '+777709999999',
        contractNumber: '№135/20 от 11.07.2021',
      });

      return changedDoc;
    }
    return BadRequestException.createBody({
      message: 'Пожалуйста используйте верную подпись',
      statusCode: 416,
    });
  }
}
