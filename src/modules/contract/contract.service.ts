import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { ContractDto } from './dto/contract.dto';
import { SignedContractDto } from './dto/signedContract.dto';

@Injectable()
export class ContractService {
  url: string = this.apiConfigService.contractUrl;
  constructor(public apiConfigService: ApiConfigService) {}
  async GenerateContract(contractDto: ContractDto): Promise<Buffer> {
    const { data } = await axios.get<Buffer>(
      `${this.url}api/pdf/template?contractNumber=
      ${contractDto.contractNumber}&contractDate=${contractDto.contractDate}&operatorPosition=
      ${contractDto.operatorPosition}&operatorFio=${contractDto.operatorFio}&companyName=${contractDto.companyName}`,
    );
    return data;
  }
  async SignedContract(
    contractDto: SignedContractDto,
    @Req() req,
  ): Promise<Buffer> {
    this.saveJson(contractDto, req);
    const { data } = await axios.post<Buffer>(
      `${this.url}api/pdf/template`,
      contractDto,
    );
    return data;
  }

  saveJson(json: any, @Req() req) {
    const jsonStr: string = json.toString();
    if (existsSync(path.resolve(__dirname, './contracts'))) {
      writeFileSync(
        path.resolve(__dirname, `./contracts/${req.user.company.id}`),
        jsonStr,
      );
    } else {
      mkdirSync(path.resolve(__dirname, './contracts'));
      writeFileSync(
        path.resolve(__dirname, `./contracts/${req.user.company.id}`),
        jsonStr,
      );
    }
  }

  getJson(@Req() req): SignedContractDto {
    const strContent = readFileSync(
      path.resolve(__dirname, `./contracts/${req.user.company.id}`),
      'utf8',
    ).toString();
    return JSON.parse(strContent);
  }
}
