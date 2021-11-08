import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { ContractDto } from './dto/contract.dto';
import type { SignedContractDto } from './dto/signedContract.dto';

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
  async SignedContract(contractDto: SignedContractDto): Promise<Buffer> {
    const { data } = await axios.post<Buffer>(
      `${this.url}api/pdf/template`,
      contractDto,
    );
    return data;
  }
}
