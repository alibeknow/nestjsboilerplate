import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { DocumentRepository } from '../document/document.repository';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentRepository, CompanyRepository])],
  controllers: [ContractController],
  providers: [ContractService, ApiConfigService],
  exports: [ContractService],
})
export class ContractModule {}
