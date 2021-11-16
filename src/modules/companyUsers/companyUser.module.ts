import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyUserController } from './companyUser.controller';
import { CompanyUserRepository } from './companyUser.repository';
import { CompanyUserService } from './companyUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyUserRepository])],
  controllers: [CompanyUserController],
  exports: [CompanyUserService],
  providers: [CompanyUserService],
})
export class CompanyUserModule {}
