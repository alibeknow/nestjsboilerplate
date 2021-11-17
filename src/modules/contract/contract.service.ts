import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { DocumentService } from '../document/document.service';
import type { ContractDto } from './dto/contract.dto';
import type { SignedContractDto } from './dto/signedContract.dto';

@Injectable()
export class ContractService {
  url: string = this.apiConfigService.contractUrl;
  constructor(
    public apiConfigService: ApiConfigService,
    private readonly documentService: DocumentService,
    private readonly сompanyRepository: CompanyRepository,
  ) {}

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
    const resultTemplate = await this.documentService.xmlPutVariables(
      contractDto,
    );
    const docCount = await this.documentService.documentRepository.count();
    const date = new Date();
    const numberContract = `${date.getMonth()}/${date.getFullYear()}/${docCount}`;
    contractDto.contractNumber = numberContract;

    await this.сompanyRepository.update(contractDto.companyId, {
      jsonData: contractDto,
    });
    await this.documentService.updateDocument(
      contractDto.companyId,
      resultTemplate,
    );
    const { data } = await axios.post<Buffer>(
      `${this.url}api/pdf/template`,
      contractDto,
      {
        responseType: 'arraybuffer',
      },
    );

    await this.saveFile(data, contractDto.companyId);
    return data;
  }

  async saveFile(pdfData: Buffer, companyId: string) {
    const docUrl = path.resolve(
      __dirname,
      `../../../contracts/${companyId}.pdf`,
    );
    if (existsSync(path.resolve(__dirname, '../../../contracts'))) {
      writeFileSync(docUrl, pdfData);
    } else {
      mkdirSync(path.resolve(__dirname, '../../../contracts'));
      writeFileSync(docUrl, pdfData);
    }
    await this.documentService.updateDocumentAsset(companyId, docUrl);
  }

  getPdf(companyId: string): Buffer {
    const strContent = readFileSync(
      path.resolve(__dirname, `../../../contracts/${companyId}.pdf`),
    );
    return strContent;
  }
}
