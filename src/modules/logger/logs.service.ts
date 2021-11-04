import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { LogDto } from './dto/log.dto';
import { LogEntity } from './log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
  ) {}

  async createLog(log: LogDto) {
    const newLog = this.logsRepository.create({
      user: { id: log.user_id },
      message: log.message,
      context: log.context,
      level: log.level,
    });
    await this.logsRepository.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}
