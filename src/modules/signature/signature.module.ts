import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { ContractService } from '../contract/contract.service';
import { DocumentModule } from '../document/document.module';
import { IbanModule } from '../iban/iban.module';
import { IbanService } from '../iban/iban.service';
import { MailService } from '../mail/mail.service';
import { SignatureRepository } from './repository/signature.repository';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  imports: [
    forwardRef(() => DocumentModule),
    IbanModule,
    TypeOrmModule.forFeature([SignatureRepository, CompanyRepository]),
  ],
  controllers: [SignatureController],
  providers: [
    SignatureService,
    ApiConfigService,
    MailService,
    IbanService,
    ContractService,
  ],
  exports: [SignatureService],
})
export class SignatureModule {}
