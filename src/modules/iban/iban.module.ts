import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { IbanController } from './iban.controller';
import { IbanService } from './iban.service';
import { AccountRepository } from './repository/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, AccountRepository])],
  controllers: [IbanController],
  providers: [IbanService, ApiConfigService],
  exports: [IbanService],
})
export class IbanModule {}
