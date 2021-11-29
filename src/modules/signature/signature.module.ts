import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyService } from '../company/company.service';
import { ContractModule } from '../contract/contract.module';
import { DocumentService } from '../contract/document.service';
import { DocumentRepository } from '../contract/repository/document.repository';
import { MailService } from '../mail/mail.service';
import { AccountRepository } from '../restFrontApi/repository/account.repository';
import { RestFrontApiService } from './../restFrontApi/restfront.service';
import { SignatureRepository } from './repository/signature.repository';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  imports: [
    ContractModule,
    TypeOrmModule.forFeature([
      SignatureRepository,
      CompanyRepository,
      AccountRepository,
      DocumentRepository,
    ]),
  ],
  controllers: [SignatureController],
  providers: [
    SignatureService,
    ApiConfigService,
    MailService,
    CompanyService,
    UtilsService,
    DocumentService,
    RestFrontApiService,
  ],
  exports: [SignatureService],
})
export class SignatureModule {}
