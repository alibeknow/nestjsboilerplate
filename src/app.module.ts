import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { AutoModule } from './modules/auto/auto.module';
import { CompanyUserModule } from './modules/companyUsers/companyUser.module';
import { ContractModule } from './modules/contract/contract.module';
import { DocumentModule } from './modules/document/document.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { IbanModule } from './modules/iban/iban.module';
import { LoggerModule } from './modules/logger/logger.module';
import { SignatureModule } from './modules/signature/signature.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ApiConfigService) => ({
        dest: './dest',
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,

      inject: [ApiConfigService],
    }),
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ApiConfigService) => ({
    //     fallbackLanguage: configService.fallbackLanguage,
    //     parserOptions: {
    //       path: path.join(__dirname, '/i18n/'),
    //       watch: configService.isDevelopment,
    //     },
    //   }),
    //   imports: [SharedModule],
    //   parser: I18nJsonParser,
    //   inject: [ApiConfigService],
    // }),
    HealthCheckerModule,
    AuthModule,
    UserModule,
    DocumentModule,
    SignatureModule,
    LoggerModule,
    IbanModule,
    ContractModule,
    CompanyUserModule,
    AutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
