import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { SignatureDto } from './dto/signatureDto';
import type { ISignature } from './interfaces/IResponseSignature';
import { SignatureRepository } from './repository/signature.repository';

@Injectable()
export class SignatureService {
  constructor(
    public readonly signatureRepository: SignatureRepository,
    public readonly configService: ApiConfigService,
  ) {}

  async verifySignature(signatureData: SignatureDto) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const {
        data: { result },
      } = await axios.post<ISignature>(
        this.configService.signatureUrl,
        signatureData,
        {
          headers,
        },
      );
      return {
        valid: result.valid,
        subject: result.cert.subject,
      };
    } catch {
      throw new BadRequestException('Сервис NcaNode не работает');
    }
  }

  async createSignature(signatureData: any) {
    const signatureEntity = this.signatureRepository.create(signatureData);
    await this.signatureRepository.save(signatureEntity);
    return signatureEntity;
  }

  async deleteSignaturesByDoc(docId: string) {
    return this.signatureRepository.delete({
      document: { id: docId },
    });
  }

  async getSignatureByDocumentId(documentId: string) {
    const queryBuilder =
      this.signatureRepository.createQueryBuilder('signature');
    const signatures = await queryBuilder
      .innerJoinAndSelect(
        'signature.document',
        'documents',
        '"documents"."id"=:documentId',
        { documentId },
      )
      .select('"signature"."fio","signature"."createdAt"')
      .execute();
    return signatures;
  }
}
