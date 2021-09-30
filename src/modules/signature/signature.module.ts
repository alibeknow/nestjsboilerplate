import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyRepository } from '../company/company.repository';
import { DocumentModule } from '../document/document.module';
import { IbanModule } from '../iban/iban.module';
import { SignatureRepository } from './repository/signature.repository';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  imports: [
    forwardRef(() => DocumentModule),
    TypeOrmModule.forFeature([SignatureRepository, CompanyRepository]),
    IbanModule,
  ],
  controllers: [SignatureController],
  providers: [SignatureService],
  exports: [SignatureService],
})
export class SignatureModule {}
