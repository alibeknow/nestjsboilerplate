import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyUserModule } from './modules/companyUsers/companyUser.module';
import { ContractModule } from './modules/contract/contract.module';
import { DatabaseModule } from './modules/dbModule/db.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RestFrontApiModule } from './modules/restFrontApi/restfront.module';
import { SignatureModule } from './modules/signature/signature.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ApiConfigService) => ({
        dest: './dest',
      }),
      inject: [ApiConfigService],
    }),
    DatabaseModule,
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
    AuthModule,
    UserModule,
    SignatureModule,
    LoggerModule,
    RestFrontApiModule,
    ContractModule,
    CompanyUserModule,
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
