import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyService } from '../company/company.service';
import { ContractService } from '../contract/contract.service';
import { DocumentModule } from '../document/document.module';
import { IbanModule } from '../iban/iban.module';
import { IbanService } from '../iban/iban.service';
import { AccountRepository } from '../iban/repository/account.repository';
import { MailService } from '../mail/mail.service';
import { SignatureRepository } from './repository/signature.repository';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  imports: [
    DocumentModule,
    IbanModule,
    TypeOrmModule.forFeature([
      SignatureRepository,
      CompanyRepository,
      AccountRepository,
    ]),
  ],
  controllers: [SignatureController],
  providers: [
    SignatureService,
    ApiConfigService,
    MailService,
    IbanService,
    CompanyService,
    UtilsService,
  ],
  exports: [SignatureService],
})
export class SignatureModule {}
