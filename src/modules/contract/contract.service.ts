import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { ContractDto } from './dto/contract.dto';
import type { SignedContractDto } from './dto/signedContract.dto';

@Injectable()
export class ContractService {
  url: string = this.apiConfigService.contractUrl;
  constructor(public apiConfigService: ApiConfigService) {}
  async GenerateContract(contractDto: ContractDto): Promise<Buffer> {
    const url = `${this.url}api/pdf/template?contractNumber=
${contractDto.contractNumber}&contractDate=${contractDto.contractDate}&operatorPosition=
${contractDto.operatorPosition}&operatorFio=${contractDto.operatorFio}&companyName=${contractDto.companyName}`;
    const { data } = await axios.get<Buffer>(encodeURI(url), {
      responseType: 'arraybuffer',
    });

    return data;
  }
  async SignedContract(contractDto: SignedContractDto): Promise<Buffer> {
    this.saveJson(contractDto, contractDto.companyId);
    const { data } = await axios.post<Buffer>(
      `${this.url}api/pdf/template`,
      contractDto,
      {
        responseType: 'arraybuffer',
      },
    );
    return data;
  }

  saveJson(json: any, companyId: string) {
    const jsonStr: string = JSON.stringify(json);

    if (existsSync(path.resolve(__dirname, '../../../contracts'))) {
      writeFileSync(
        path.resolve(__dirname, `../../../contracts/${companyId}`),
        jsonStr,
      );
    } else {
      mkdirSync(path.resolve(__dirname, '../../../contracts'));
      writeFileSync(
        path.resolve(__dirname, `../../../contracts/${companyId}`),
        jsonStr,
      );
    }
  }

  getJson(@Req() req) {
    const strContent = readFileSync(
      path.resolve(__dirname, `../../../contracts/${req.user.company.id}`),
      'utf8',
    ).toString();
    return JSON.parse(strContent);
  }
}
