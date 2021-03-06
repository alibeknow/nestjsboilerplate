import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Auth } from '../../decorators/http.decorators';
import { SignatureRepository } from '../signature/repository/signature.repository';
import { DocumentService } from './document.service';
import { DeclineDocument } from './dto/delcine-document.dto';
import { DocumentDto } from './dto/document-dto';

@Controller('documents')
@ApiTags('documents')
export class DocumentController {
  constructor(public readonly documentService: DocumentService) {}
  @Auth([RoleType.USER])
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DocumentDto,
    description: 'Document info with access token',
  })
  async getFilteredDocs(@Req() request): Promise<DocumentDto[] | DocumentDto> {
    const documents = await this.documentService.getDocs(
      request.user.company.id as string,
    );
    return documents;
  }
  @Auth([RoleType.ADMIN])
  @Post('decline')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: 'string',
    description: 'Decline Document',
  })
  declineContract(@Body() decline: DeclineDocument) {
    return this.documentService.declineDocument(decline);
  }
}
