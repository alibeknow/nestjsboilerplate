import {
  BadGatewayException,
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
import { UtilsService } from '../../shared/services/utils.service';
import { CompanyService } from '../company/company.service';
import { DocumentService } from '../contract/document.service';
import { EmailTemplate } from '../mail/dto/sendmail.dto';
import { MailService } from '../mail/mail.service';
import { RestFrontApiService } from '../restFrontApi/restfront.service';
import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
@ApiTags('signature')
export class SignatureController {
  constructor(
    public readonly signatureService: SignatureService,
    public readonly documentService: DocumentService,
    public readonly restFrontApiService: RestFrontApiService,
    public readonly mailService: MailService,
    public readonly companyService: CompanyService,
    public readonly utilsService: UtilsService,
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

  @Auth([RoleType.USER])
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
    const isValid = this.utilsService.validateSignature(
      { valid, subject },
      {
        bin: request.user.company.bin,
        idn: request.user.idn,
        companyType: request.user.company.companyType,
      },
    );
    if (isValid) {
      const {
        params: { xml },
      } = signatureData;
      const changedDoc = await this.documentService.changeStatus(
        Status.SIGNED,
        companyId,
        false,
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
    throw new BadRequestException('Пожалуйста используйте верную подпись');
  }

  @Auth([RoleType.ADMIN])
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
      const { jsonData } = await this.companyService.getByBin(companyId);
      const changedDoc = await this.documentService.changeStatus(
        Status.APPROVED,
        companyId,
        false,
        jsonData.contractNumber,
      );
      await this.signatureService.createSignature({
        body: xml,
        document: document[0].id,
        fio: subject.commonName,
        name: 'clientSignature',
      });

      const date = new Date();
      const expireDate = new Date();
      expireDate.setFullYear(2099);
      const params = {
        address: jsonData.legalAddress,
        companyName: jsonData.companyName.replace('\\\\', '\\'),
        xin: jsonData.bin,
        email: jsonData.email,
        mobileNumber: jsonData.phone,
        contractNumber: jsonData.contractNumber,
        registrationDate: date.toISOString(),
        expirationDate: expireDate.toISOString(),
      };
      try {
        const data = await this.restFrontApiService.createIbanAccount(params);
        return { changes: changedDoc, account: data };
      } catch {
        throw new BadGatewayException(
          `Ошибка сервиса ${JSON.stringify(params)}`,
        );
      }
    }
    throw new BadRequestException('Пожалуйста используйте верную подпись');
  }
}
