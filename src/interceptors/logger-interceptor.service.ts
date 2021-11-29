import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Body, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { LogsService } from '../modules/logger/logs.service';
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(readonly logsService: LogsService) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map(async (data) => {
        const responseObject = {
          data,
          url: request.url,
          method: request.method,
          request: { body: request.body, query: request.query },
        };
        await this.logsService.createLog({
          user_id: request.user.id || null,
          context: request.url,
          level: 'action',
          message: JSON.stringify(responseObject),
        });
        return { data };
      }),
    );
  }
}
