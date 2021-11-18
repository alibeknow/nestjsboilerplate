/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@nestjs/common';
import * as fxp from 'fast-xml-parser';
import { readFileSync } from 'fs';
import * as he from 'he';
import { result } from 'lodash';
// eslint-disable-next-line unicorn/import-style
import { resolve } from 'path';

import { CompanyRepository } from '../company/company.repository';
import type { SignedContractDto } from '../contract/dto/signedContract.dto';
import { Status } from './../../common/constants/status';
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

  async updateDocument(companyId: string, body: string) {
    const document = await this.documentRepository.findOne({
      where: { company: { id: companyId } },
    });
    document.body = body;
    const updatedvalues = await this.documentRepository.save(document);
    return updatedvalues;
  }

  async updateDocumentAsset(companyId: string, asset: string) {
    const document = await this.documentRepository.findOne({
      where: { company: { id: companyId } },
    });
    document.asset = asset;
    const updatedvalues = await this.documentRepository.save(document);
    return updatedvalues;
  }

  async declineDocument(decline: DeclineDocument) {
    const document = await this.documentRepository.findOne({
      where: {
        company: {
          bin: decline.bin,
        },
      },
    });
    document.status = Status.DECLINE;
    document.comments = decline.comments;
    await this.documentRepository.save(document);
    return 'OK';
  }
  async getDocs(companyId: string): Promise<DocumentDto[] | DocumentDto> {
    const documents = await this.documentRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
    if (documents.length <= 0) {
      const contract = this.getTemplate();
      const document = this.documentRepository.create([
        {
          name: 'Документ на подпись',
          body: contract,
          company: { id: companyId },
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
  async xmlPutVariables(variables: SignedContractDto): Promise<string> {
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
    const xmlJson: IContract = await fxp.parse(template, options);
    xmlJson.Contract.operatorFio = variables.operatorFio;
    xmlJson.Contract.contractDate = variables.contractDate;
    xmlJson.Contract.operatorPosition = variables.operatorPosition;
    const data = xmlJson.Contract.data;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < data.length; index++) {
      data[index].bank = variables.bank;
      data[index].iik = variables.iik;
      data[index].bik = variables.bik;
      data[index].bin = variables.bin;
      data[index].kbe = variables.kbe;
      data[index].website = variables.website;
      data[index].phone = variables.phone;
      data[index].companyName = variables.companyName;
      data[index].userFio = variables.userFio;
      data[index].operatorPosition = variables.operatorPosition;
      data[index].operatorFio = variables.operatorFio;
      data[index].operatorDoc = variables.operatorDoc;
      data[index].userPosition = variables.userPosition;
      data[index].legalAddress = variables.legalAddress;
      data[index].factAddress = variables.factAddress;
      data[index].email = variables.email;
      data[index].userDoc = variables.userDoc;
    }
    xmlJson.Contract.data = data;
    const optionsJsonToXml = {
      attributeNamePrefix: '@_',
      attrNodeName: '@', //default is false
      textNodeName: '#text',
      ignoreAttributes: true,
      cdataTagName: '__cdata', //default is false
      cdataPositionChar: '\\c',
      format: false,
      indentBy: '  ',
      supressEmptyNode: false,

      rootNodeName: 'element',
    };
    const js2Xml = new fxp.j2xParser(optionsJsonToXml);
    const xml = js2Xml.parse(xmlJson);
    return xml;
  }
  getTemplate() {
    const content = readFileSync(
      resolve(__dirname, './template/contract.xml'),
      'utf8',
    ).toString();

    return content;
  }
}
