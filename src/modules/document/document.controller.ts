import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Auth } from '../../decorators/http.decorators';
import { AuthService } from '../auth/auth.service';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document-dto';

@Controller('documents')
export class DocumentController {
  constructor(
    public readonly documentService: DocumentService,
    public readonly authService: AuthService,
  ) {}
  @Auth()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DocumentDto,
    description: 'Document info with access token',
  })
  getDocuments() {
    return this.documentService.getDocuments();
  }
}
