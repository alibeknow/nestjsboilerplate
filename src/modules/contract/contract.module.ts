import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyUserRepository } from '../companyUsers/companyUser.repository';
import { CompanyUserService } from '../companyUsers/companyUser.service';
import { SignatureRepository } from '../signature/repository/signature.repository';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { DocumentService } from './document.service';
import { AssetsRepository } from './repository/assets.repository';
import { DocumentRepository } from './repository/document.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      CompanyRepository,
      SignatureRepository,
      AssetsRepository,
      CompanyUserRepository,
    ]),
  ],
  controllers: [ContractController],
  providers: [
    ContractService,
    ApiConfigService,
    CompanyUserService,
    DocumentService,
  ],
  exports: [ContractService],
})
export class ContractModule {}
