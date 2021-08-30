import { Inject, Injectable } from '@nestjs/common';
import type { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { timeout } from 'rxjs/operators';

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  isHealthy(eventName: string): Promise<undefined> {
    return undefined;
  }
}
