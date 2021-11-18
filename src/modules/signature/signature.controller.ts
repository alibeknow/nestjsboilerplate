import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { RoleType } from '../../common/constants/role-type';
import { Status } from '../../common/constants/status';
import { Auth } from '../../decorators/http.decorators';
import { LoggerInterceptor } from '../../interceptors/logger-interceptor.service';
import { CompanyService } from '../company/company.service';
import { ContractService } from '../contract/contract.service';
import { DocumentService } from '../document/document.service';
import { IbanService } from '../iban/iban.service';
import { EmailTemplate } from '../mail/dto/sendmail.dto';
import { MailService } from '../mail/mail.service';
import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
@ApiTags('signature')
export class SignatureController {
  constructor(
    public readonly signatureService: SignatureService,
    public readonly documentService: DocumentService,
    public readonly ibanService: IbanService,
    public readonly mailService: MailService,
    public readonly companyService: CompanyService,
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
  @UseInterceptors(LoggerInterceptor)
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
      await this.mailService.sendMail({
        email: request.user.email,
        subject: 'Вы  подписали документ',
        content: EmailTemplate.SIGNED,
      });
      return changedDoc;
    }
    return BadRequestException.createBody({
      message: 'Пожалуйста используйте верную подпись',
      statusCode: 416,
    });
  }

  @Auth(RoleType.ADMIN)
  @UseInterceptors(LoggerInterceptor)
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
      const { jsonData } = await this.companyService.getByBin('140241014416');
      const jsonParsed = jsonData;
      const data = await this.ibanService.createIbanAccount({
        address: jsonParsed.legalAddress,
        companyName: jsonParsed.companyName,
        xin: jsonParsed.bin,
        email: jsonParsed.email,
        mobileNumber: jsonParsed.contractNumber,
        contractNumber: jsonParsed.contractNumber,
      });

      return changedDoc;
    }
    throw new BadRequestException('Пожалуйста используйте верную подпись');
  }
}
