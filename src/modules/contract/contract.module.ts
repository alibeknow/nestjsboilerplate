import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { DocumentRepository } from '../document/document.repository';
import { DocumentService } from '../document/document.service';
import { SignatureRepository } from '../signature/repository/signature.repository';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      CompanyRepository,
      SignatureRepository,
    ]),
  ],
  controllers: [ContractController],
  providers: [ContractService, ApiConfigService, DocumentService],
  exports: [ContractService],
})
export class ContractModule {}
