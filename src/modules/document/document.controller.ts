import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Auth } from '../../decorators/http.decorators';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document-dto';

@Controller('documents')
export class DocumentController {
  constructor(public readonly documentService: DocumentService) {}
  @Auth()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DocumentDto,
    description: 'Document info with access token',
  })
  getFilteredDocs(@Req() request) {
    console.log(request.user.company);
    return this.documentService.getDocs(request.user.company.id);
  }
}
