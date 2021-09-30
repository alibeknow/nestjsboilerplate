import { Injectable } from '@nestjs/common';
import axios from 'axios';

import type { SignatureDto } from './dto/signatureDto';
import type { ISignature } from './interfaces/IResponseSignature';
import { SignatureRepository } from './repository/signature.repository';

@Injectable()
export class SignatureService {
  constructor(public readonly signatureRepository: SignatureRepository) {}

  async verifySignature(signatureData: SignatureDto) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const {
      data: { result },
    } = await axios.post<ISignature>(
      process.env.SIGNATURE_VERIFICATION_URL,
      signatureData,
      {
        headers,
      },
    );
    return {
      valid: result.valid,
      subject: result.cert.subject,
    };
  }

  async createSignature(signatureData: any) {
    const signatureEntity = this.signatureRepository.create(signatureData);
    await this.signatureRepository.save(signatureEntity);
    return signatureEntity;
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
