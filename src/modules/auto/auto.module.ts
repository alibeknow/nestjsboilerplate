import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UtilsService } from '../../shared/services/utils.service';
import { AutoController } from '../auto/auto.controller';
import { CompanyRepository } from '../company/company.repository';
import { AccountRepository } from '../iban/repository/account.repository';
import { SignatureRepository } from '../signature/repository/signature.repository';
import { SignatureModule } from '../signature/signature.module';
import { SignatureService } from '../signature/signature.service';
import { AutoService } from './auto.service';
@Module({
  imports: [
    SignatureModule,
    TypeOrmModule.forFeature([SignatureRepository, AccountRepository]),
  ],
  controllers: [AutoController],
  providers: [ApiConfigService, AutoService, SignatureService, UtilsService],
})
export class AutoModule {}
