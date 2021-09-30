import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { CompanyRepository } from '../company/company.repository';
import type { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type { ICreateIbanAccount } from './interfaces/ICreateIbanAccount';

@Injectable()
export class IbanService {
  constructor(public readonly companyRepository: CompanyRepository) {}
  async createIbanAccount(
    ibanAccountDto: IbanAccountServiceDto,
  ): Promise<ICreateIbanAccount> {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.post<ICreateIbanAccount>(
        'http://10.0.89.10:8096/api/legal-account/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        ibanAccountDto,
        {
          headers,
        },
      );
      await this.companyRepository.update(
        { bin: ibanAccountDto.xin },
        { iban: data.answer.accountNumber },
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
