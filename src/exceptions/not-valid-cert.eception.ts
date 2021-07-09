import { NotFoundException } from '@nestjs/common';

export class NotValidCertException extends NotFoundException {
  constructor(error?: string) {
    super('error.not_valid_signature', error);
  }
}
