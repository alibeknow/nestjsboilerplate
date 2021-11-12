import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import type { AutoDto } from './dto/auto.dto';
import type { AutoListDto } from './dto/autoList.dto';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AutoService {
  url: string;
  secret: string;
  constructor(
    public readonly companyRepository: CompanyRepository,
    public readonly accountRepository: AccountRepository,
    public apiConfigService: ApiConfigService,
  ) {
    const result = this.apiConfigService.frontRestUrl;
    this.url = result.url;
    this.secret = result.secret;
  }
  async addAutoAccount(autoDto: Omit<AutoDto, 'signature'>) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.post(
        `${this.url}/add-vehicle?token=${this.secret}`,
        autoDto,
        {
          headers,
        },
      );
      return data;
    } catch (error) {
      Logger.error(error);
    }
  }

  async deleteAutoAccount(autoDto: Omit<AutoDto, 'signature'>) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.post(
        `${this.url}/remove-vehicle?token=${this.secret}`,
        autoDto,
        {
          headers,
        },
      );
      return data;
    } catch (error) {
      Logger.error(error);
    }
  }

  async getListAutoAccount(autoDto: AutoListDto) {
    try {
      const { data } = await axios.get(
        `${this.url}/vehicle-list?token=${this.secret}&accountNumber=${autoDto.accountNumber}&page=${autoDto.page}&size=${autoDto.size}`,
      );
      return data;
    } catch (error) {
      Logger.error(error);
    }
  }
}
