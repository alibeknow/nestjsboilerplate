import { Global, Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { SharedModule } from '../../shared/shared.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
    }),
  ],
})
export class DatabaseModule {}
