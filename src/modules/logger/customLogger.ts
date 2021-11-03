import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';

import { getLogLevels } from '../../providers/loglevel.provider';
import { LogsService } from './logs.service';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogsService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LogsService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });

    this.logsService = logsService;
  }

  async log(message: string, context?: string) {
    Reflect.apply(super.log, this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: 'log',
    });
  }
  async error(message: string, stack?: string, context?: string) {
    Reflect.apply(super.error, this, [message, stack, context]);

    await this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  async warn(message: string, context?: string) {
    Reflect.apply(super.warn, this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  async debug(message: string, context?: string) {
    Reflect.apply(super.debug, this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  async verbose(message: string, context?: string) {
    Reflect.apply(super.debug, this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
}
