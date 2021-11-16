import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyRepository } from '../company/company.repository';
import { DocumentController } from './document.controller';
import { DocumentRepository } from './document.repository';
import { DocumentService } from './document.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentRepository, CompanyRepository])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
