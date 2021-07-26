import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(
    public readonly documentService: DocumentService,
    public readonly authService: AuthService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async getDocuments() {
    this.documentService.getDocuments();
  }
}
