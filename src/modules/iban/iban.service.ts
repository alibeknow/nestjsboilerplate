import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import type { AccountDto } from './dto/account-entity.dto';
import type { ArrayAccounts } from './dto/accounts.array.dto';
import type { IbanAccountServiceDto } from './dto/ibanAccountService.dto';
import type { SetMainDto } from './dto/setMain.dto';
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

    if (!searchResult || searchResult.totalElements <= 0) {
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
        const accountEntity = this.accountRepository.create({
          iban: data.answer.accountNumber,
          isMain: true,
          name: date.toISOString(),
          company: { id: company.id },
        });
        await this.accountRepository.save(accountEntity);
        return data;
      } catch (error) {
        throw new BadRequestException(error, 'could create account');
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

  async setMainAccount(setMain: SetMainDto) {
    const ibanCount = await this.accountRepository.find({
      where: { company: { id: setMain.companyId }, iban: setMain.iban },
    });
    if (ibanCount.length <= 0) {
      const account = this.accountRepository.create({
        company: { id: setMain.companyId },
        iban: setMain.iban,
        isActive: true,
        isMain: true,
        name: Date.now().toString(),
      });
      const result = await this.accountRepository.save(account, { data: true });
      return result;
    }
    const result = await this.accountRepository
      .createQueryBuilder()
      .update()
      .set({ isMain: false })
      .where('company_id=:companyId', { companyId: setMain.companyId })
      .execute();
    if (result.affected <= 0) {
      throw new NotFoundException();
    }
    const affected = await this.accountRepository.update(
      { iban: setMain.iban },
      { isMain: true },
    );
    return affected;
  }

  async searchAccountByBin(bin: string): Promise<ISearchAccountResponse> {
    const { data } = await axios.get<ISearchAccountResponse>(
      `${this.url}/searchByXin?token=${this.secret}&xin=${bin}`,
    );
    return data;
  }
  async addAccounts(account: ArrayAccounts, req) {
    for (let index = 0; index < account.accounts.length; index++) {
      account.accounts[index].company.id = req.user.company.id;
    }
    const accounts = await this.accountRepository
      .createQueryBuilder()
      .insert()
      .values(account.accounts)
      .execute();
    return accounts;
  }
}
