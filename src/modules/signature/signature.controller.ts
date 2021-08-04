import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Status } from '../../common/constants/status';
import { Auth } from '../../decorators/http.decorators';
import { DocumentService } from '../document/document.service';
import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
export class SignatureController {
  constructor(
    public readonly signatureService: SignatureService,
    public readonly documentService: DocumentService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify signature XML',
    type: SignatureDto,
  })
  async verifySignature(@Body() signatureData: SignatureDto) {
    const result = await this.signatureService.verifySignature(signatureData);
    return result;
  }
  @Auth()
  @Post('document')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify document Signature XML',
    type: SignatureDto,
  })
  async verifyDocument(@Body() signatureData: SignatureDto, @Req() request) {
    const userId = request.user.id;
    const signature = await this.verifySignature(signatureData);

    if (signature.valid) {
      const changedDoc = await this.documentService.changeStatus(
        Status.SIGNED,
        userId,
      );
      return changedDoc;
    }
    return false;
  }
}
