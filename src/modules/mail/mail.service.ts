import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFileSync } from 'fs';
// eslint-disable-next-line unicorn/import-style
import { resolve } from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { SendEmail } from './dto/sendmail.dto';
import { EmailTemplate } from './dto/sendmail.dto';
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
      case EmailTemplate.SIGNED:
        {
          content = readFileSync(
            resolve(__dirname, './templates/signed.template.html'),
            'utf8',
          ).toString();
        }
        break;
      case EmailTemplate.SIGNEDOPERATOR:
        {
          content = readFileSync(
            resolve(__dirname, './templates/signedoperator.template.html'),
            'utf8',
          ).toString();
        }
        break;
      case EmailTemplate.ADDVEHICLE:
        {
          content = readFileSync(
            resolve(__dirname, './templates/addVehicle.template.html'),
            'utf8',
          ).toString();
        }
        break;
      case EmailTemplate.REGISTRATION:
        {
          content = readFileSync(
            resolve(__dirname, './templates/registation.template.html'),
            'utf8',
          ).toString();
        }
        break;

      case EmailTemplate.SIGNEDREJECTED:
        {
          content = readFileSync(
            resolve(__dirname, './templates/declineContract.template.html'),
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
