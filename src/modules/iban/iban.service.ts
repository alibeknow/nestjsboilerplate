import { Injectable } from '@nestjs/common';
import axios from 'axios';

import type { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type { ICreateIbanAccount } from './interfaces/ICreateIbanAccount';

@Injectable()
export class IbanService {
  async createIbanAccount(
    ibanAccountDto: IbanAccountServiceDto,
  ): Promise<ICreateIbanAccount> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.post<ICreateIbanAccount>(
      `${process.env.LEGAL_ACCOUNT_URL}/create`,
      ibanAccountDto,
      {
        headers,
      },
    );

    return data;
  }
}
