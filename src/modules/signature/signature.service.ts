import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { AuthService } from '../auth/auth.service';
import type { SignatureDto } from './dto/signatureDto';

@Injectable()
export class SignatureService {
  sendSignature(signatureData: SignatureDto) {
    return null;
  }
}
