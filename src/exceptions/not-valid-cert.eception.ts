import { ForbiddenException } from '@nestjs/common';

export class NotValidCertException extends ForbiddenException {
  constructor(error?: string) {
    super('error.not_valid_signature', error);
  }
}
