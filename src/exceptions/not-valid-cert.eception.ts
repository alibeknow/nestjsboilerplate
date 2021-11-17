import { BadRequestException } from '@nestjs/common';

export class NotValidCertException extends BadRequestException {
  constructor(error?: string) {
    super('error.not_valid_signature', error);
  }
}
