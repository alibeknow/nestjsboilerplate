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
    } = await axios.post<ISignature>('http://localhost:14579', signatureData, {
      headers,
    });
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
}
