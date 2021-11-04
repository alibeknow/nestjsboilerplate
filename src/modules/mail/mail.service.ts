import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { SendEmail } from './dto/sendmail.dto';
import type { IMailResponse } from './interface/ImailResponse';
@Injectable()
export class MailService {
  url: string;
  constructor(public apiConfigService: ApiConfigService) {
    this.url = this.apiConfigService.mailUrl;
  }
  async sendMail(sendEmail: SendEmail): Promise<string> {
    let content = '';
    switch (sendEmail.content) {
      case 'SIGNED':
        {
          content = readFileSync(
            resolve(__dirname, './templates/signed.template.html'),
            'utf8',
          ).toString();
        }
        break;
      case 'SIGNEDOPERATOR':
        {
          content = readFileSync(
            resolve(__dirname, './templates/signedoperator.template.html'),
            'utf8',
          ).toString();
        }
        break;
      default:
        break;
    }

    const {
      data: { status },
    } = await axios.post<IMailResponse>(
      `${this.url}/sendByContent`,
      {
        email: sendEmail.email,
        content,
        subject: sendEmail.subject,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return status;
  }
}
