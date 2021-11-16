import { Injectable } from '@nestjs/common';
import * as fxp from 'fast-xml-parser';
import { readFileSync } from 'fs';
import * as he from 'he';
import { result } from 'lodash';
// eslint-disable-next-line unicorn/import-style
import { resolve } from 'path';

import { CompanyRepository } from '../company/company.repository';
import type { Status } from './../../common/constants/status';
import { DocumentRepository } from './document.repository';
import type { DeclineDocument } from './dto/delcine-document.dto';
import type { DocumentDto } from './dto/document-dto';
import type { IContract } from './interface/IContract';
@Injectable()
export class DocumentService {
  constructor(
    public readonly documentRepository: DocumentRepository,
    public readonly companyRepository: CompanyRepository,
  ) {}

  async updateDocument(id: string) {
    const result = await this.companyRepository.findOne(id);
    const xml = await this.documentRepository.findOne({
      where: { company: { id } },
    });
  }

  async declineDocument(decline: DeclineDocument) {
    const document = await this.documentRepository.findOne({
      where: {
        company: {
          bin: decline.bin,
        },
      },
    });
    document.status = decline.status;
    document.comments = decline.comments;
    await this.documentRepository.save(document);
    return 'OK';
  }
  async getDocs(company): Promise<DocumentDto[] | DocumentDto> {
    const documents = await this.documentRepository.find({
      where: { company },
    });
    if (documents.length <= 0) {
      const contract = this.getTemplate();
      const document = this.documentRepository.create([
        {
          name: 'Документ на подпись',
          body: contract,
          company,
        },
      ]);
      await this.documentRepository.save(document);
      return document.toDtos();
    }
    return documents.toDtos();
  }
  changeStatus(status: Status, companyId) {
    return this.documentRepository.update(
      {
        company: companyId,
      },
      {
        status,
      },
    );
  }
  async xmlPutVariables(jsonXml: any, variables: any): Promise<IContract> {
    const options = {
      attributeNamePrefix: '@_',
      attrNodeName: 'attr', //default is 'false'
      textNodeName: 'text',
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: '__cdata', //default is 'false'
      cdataPositionChar: '\\c',
      parseTrueNumberOnly: false,
      numParseOptions: {
        hex: true,
        leadingZeros: true,
        //skipLike: /\+[0-9]{10}/
      },
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
      tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ['parse-me-as-string'],
      alwaysCreateTextNode: false,
    };
    const template = this.getTemplate();
    const xmlJson = await fxp.parse(template, options);

    return xmlJson;
  }
  getTemplate() {
    const content = readFileSync(
      resolve(__dirname, './template/contract.xml'),
      'utf8',
    ).toString();
    return content;
  }
}
