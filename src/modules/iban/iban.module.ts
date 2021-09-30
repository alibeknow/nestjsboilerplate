import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyRepository } from '../company/company.repository';
import { IbanController } from './iban.controller';
import { IbanService } from './iban.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  controllers: [IbanController],
  providers: [IbanService],
  exports: [IbanService],
})
export class IbanModule {}
