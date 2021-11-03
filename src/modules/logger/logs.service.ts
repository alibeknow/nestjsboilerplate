import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { LogDto } from './dto/log.dto';
import { Log } from './log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  async createLog(log: LogDto) {
    const newLog = this.logsRepository.create();
    newLog.context = log.context;
    newLog.message = log.message;
    newLog.level = log.level;
    await this.logsRepository.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}
