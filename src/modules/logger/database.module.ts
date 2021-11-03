import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomLogger } from './customLogger';
import { Log } from './log.entity';
import { LogsService } from './logs.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}
