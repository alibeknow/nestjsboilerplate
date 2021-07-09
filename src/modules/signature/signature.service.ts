import { Injectable } from '@nestjs/common';
import axios from 'axios';

import type { SignatureDto } from './dto/signatureDto';

@Injectable()
export class SignatureService {
  async verifySignature(signatureData: SignatureDto) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const {
      data: { result },
    } = await axios.post('http://10.0.85.60:14579', signatureData, {
      headers,
    });
    return {
      valid: result.valid,
      subject: result.cert.chain[0],
    };
  }
}
