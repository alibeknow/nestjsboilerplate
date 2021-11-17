import { BadRequestException } from '@nestjs/common';

export class NotValidCertException extends BadRequestException {
  constructor(error?: string) {
    super('error.server_not_respond', error);
  }
}
