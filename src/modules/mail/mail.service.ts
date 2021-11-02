import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { SendEmail } from './dto/sendmail.dto';
@Injectable()
export class MailService {
  url: string;
  secret: string;
  constructor(public apiConfigService: ApiConfigService) {
    this.url = this.apiConfigService.mailUrl;
  }
  async sendMail(sendEmail: SendEmail): Promise<any> {
    const { data } = await axios.post(`${this.url}/sendByContent`, {
      data: sendEmail,
    });
    return data;
  }
}
