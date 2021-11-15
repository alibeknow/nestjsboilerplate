import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { AutoController } from '../auto/auto.controller';
import { CompanyRepository } from '../company/company.repository';
import { AccountRepository } from '../iban/repository/account.repository';
import { SignatureModule } from '../signature/signature.module';
import { SignatureService } from '../signature/signature.service';
import { AutoService } from './auto.service';
@Module({
  imports: [SignatureModule],
  controllers: [AutoController],
  providers: [ApiConfigService, AutoService, SignatureService],
})
export class AutoModule {}
