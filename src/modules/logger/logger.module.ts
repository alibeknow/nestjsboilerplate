import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomLogger } from './customLogger';
import { LogEntity } from './log.entity';
import { LogsService } from './logs.service';
@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([LogEntity])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger, LogsService],
})
export class LoggerModule {}
