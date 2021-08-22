import { Injectable } from '@nestjs/common';
import axios from 'axios';

import type { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type {
  IContent,
  ICreateIbanAccount,
} from './interfaces/ICreateIbanAccount';
import type { IErrorResponse } from './interfaces/IErrorResponse';

@Injectable()
export class IbanService {
  async createIbanAccount(
    ibanAccountDto: IbanAccountServiceDto,
  ): Promise<IContent[] | IErrorResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const { status, statusText } = await axios.post<ICreateIbanAccount>(
      'http://10.0.89.10:8090/api/companies',
      ibanAccountDto,
      {
        headers,
      },
    );
    if (status === 202) {
      const date = new Date();
      const expirationDate = new Date(2099);
      const { data } = await axios.post<string>(
        'http://10.0.89.10:8090/api/personal-accounts',
        {
          xin: ibanAccountDto.bin,
          contructNumber: `№ ${date.getMonth()}-${
            date.getDay() + date.getFullYear()
          } ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
          registrationDate: date.toUTCString(),
          expirationDate: expirationDate.toUTCString(),
        },
        {
          headers,
        },
      );
      const {
        data: { content },
      } = await axios.get<ICreateIbanAccount>(
        `http://10.0.89.10:8090/api/personal-accounts/search/byCriteria?ownerXin.equals=${data}`,
      );

      return content;
    }
    return {
      status,
      statusText,
    };
  }
}
