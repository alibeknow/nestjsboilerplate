import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CompanyRepository } from '../company/company.repository';
import { SignatureRepository } from '../signature/repository/signature.repository';
import { SignatureService } from '../signature/signature.service';
import { AccountRepository } from './repository/account.repository';
import { RestFrontController } from './restfront.controller';
import { RestFrontApiService } from './restfront.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      AccountRepository,
      SignatureRepository,
    ]),
  ],
  controllers: [RestFrontController],
  providers: [
    RestFrontApiService,
    ApiConfigService,
    UtilsService,
    SignatureService,
  ],
  exports: [RestFrontApiService],
})
export class RestFrontApiModule {}
