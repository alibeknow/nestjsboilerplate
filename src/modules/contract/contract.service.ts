import { BadGatewayException, Injectable, Req } from '@nestjs/common';
import axios from 'axios';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
// eslint-disable-next-line unicorn/import-style
import { resolve } from 'path';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyUserService } from '../companyUsers/companyUser.service';
import { DocumentService } from '../document/document.service';
import { AssetsRepository } from './assets.repository';
import type { ContractDto } from './dto/contract.dto';
import type { SignedContractDto } from './dto/signedContract.dto';

@Injectable()
export class ContractService {
  url: string = this.apiConfigService.contractUrl;
  constructor(
    public apiConfigService: ApiConfigService,
    private readonly documentService: DocumentService,
    private readonly сompanyRepository: CompanyRepository,
    public readonly assetRepository: AssetsRepository,
    public readonly companyUserService: CompanyUserService,
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

  async SignedContract(
    contractDto: SignedContractDto,
    file: Express.Multer.File,
  ): Promise<Buffer> {
    const companyUser =
      await this.companyUserService.companyUserRepository.findOneOrFail();
    contractDto.operatorDoc = companyUser.operatorDoc;
    contractDto.operatorFio = `${companyUser.lastName} ${companyUser.firstName} ${companyUser.middleName}`;
    contractDto.operatorPosition = companyUser.position;
    const document = await this.documentService.documentRepository.findOne({
      where: { company: { id: contractDto.companyId } },
    });
    const resultTemplate = await this.documentService.xmlPutVariables(
      contractDto,
    );
    const date = new Date();
    const numberContract = `${document.docNumber + 436}/${date
      .getFullYear()
      .toString()
      .slice(
        -2,
      )} от ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}г.`;
    contractDto.contractNumber = numberContract;

    if (file[0]) {
      const assets = await this.getAssets(document.id);
      for (const assetVariable of assets[0]) {
        if (existsSync(assetVariable.path)) {
          unlinkSync(assetVariable.path);
        }
      }
      const params = {
        path: file[0].path,
        mimeType: file[0].mimetype,
        name: file[0].filename,
        document: { id: document.id },
      };
      await this.assetRepository.delete({ document: { id: document.id } });
      const asset = this.assetRepository.create(params);
      await this.assetRepository.save(asset);
    }

    await this.сompanyRepository.update(contractDto.companyId, {
      jsonData: contractDto,
    });

    document.body = resultTemplate;

    document.enableResign = true;
    await this.documentService.documentRepository.save(document);

    const { data } = await axios.post<Buffer>(
      `${this.url}api/pdf/template`,
      contractDto,
      {
        responseType: 'arraybuffer',
      },
    );
    try {
      await this.saveFile(data, contractDto.companyId);
    } catch (error) {
      throw new BadGatewayException(error, 'File save Problem');
    }

    return data;
  }

  getAssets(documentId: string) {
    return this.assetRepository.findAndCount({
      where: { document: { id: documentId } },
    });
  }
  async downloadAssets(assetId: string) {
    const { mimeType, name, path } = await this.assetRepository.findOne(
      assetId,
      {
        select: ['mimeType', 'name', 'path'],
      },
    );
    const rootProject = resolve(__dirname, `../../../${path}`);
    const strContent = readFileSync(rootProject);

    return { file: strContent, mimeType, name };
  }

  async saveFile(pdfData: Buffer, companyId: string) {
    const docUrl = resolve(__dirname, `../../../contracts/${companyId}.pdf`);
    if (existsSync(resolve(__dirname, '../../../contracts'))) {
      writeFileSync(docUrl, pdfData);
    } else {
      mkdirSync(resolve(__dirname, '../../../contracts'));
      writeFileSync(docUrl, pdfData);
    }
    await this.documentService.updateDocumentAsset(companyId, docUrl);
  }

  getPdf(companyId: string): Buffer {
    const strContent = readFileSync(
      resolve(__dirname, `../../../contracts/${companyId}.pdf`),
    );
    return strContent;
  }
}
