import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import type { AccountDto } from './dto/account-entity.dto';
import type { ArrayAccounts } from './dto/accounts.array.dto';
import type { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type { ICreateIbanAccount } from './interfaces/ICreateIbanAccount';
import type { ISearchAccountResponse } from './interfaces/ISearchAccountResponse';
import { AccountEntity } from './repository/account.entity';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class IbanService {
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
  async createIbanAccount(
    ibanAccountDto: IbanAccountServiceDto,
  ): Promise<ICreateIbanAccount | ISearchAccountResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const searchResult = await this.searchAccountByBin(ibanAccountDto.xin);
    if (searchResult.totalElements <= 0) {
      try {
        const { data } = await axios.post<ICreateIbanAccount>(
          `${this.url}/create?token=${this.secret}`,
          ibanAccountDto,
          {
            headers,
          },
        );
        const company = await this.companyRepository.findOne({
          bin: ibanAccountDto.xin,
        });
        const date = new Date();
        const iban = new AccountEntity();
        iban.iban = data.answer.accountNumber;
        iban.name = date.getUTCDate().toString();
        iban.isMain = true;
        iban.isActive = true;
        company.accounts = [iban];
        await this.companyRepository.save(company);

        return data;
      } catch (error) {
        Logger.error(error);
      }
    }
    return searchResult;
  }

  async getMainAccount(companyId: string): Promise<CompanyEntity> {
    const queryBuilder = this.companyRepository.createQueryBuilder('company');
    const result = await queryBuilder
      .innerJoinAndSelect(
        'company.accounts',
        'accounts',
        '"accounts"."is_main" =true',
      )
      .andWhere('company.id = :companyId', { companyId })
      .getOne();
    return result;
  }

  async setMainAccount(iban: string, companyId: string) {
    await this.accountRepository
      .createQueryBuilder()
      .update()
      .set({ isMain: false })
      .where('company_id=:companyId', { companyId })
      .execute();
    const result = await this.accountRepository.update(
      { iban },
      { isMain: true },
    );
    return result;
  }

  async searchAccountByBin(bin: string): Promise<ISearchAccountResponse> {
    const { data } = await axios.get<ISearchAccountResponse>(
      `${this.url}/searchByXin?token=${this.secret}&xin=${bin}`,
    );
    return data;
  }
  async addAccounts(account: ArrayAccounts) {
    const accounts = await this.accountRepository
      .createQueryBuilder()
      .insert()
      .values(account.accounts)
      .execute();
    return accounts;
  }
}
