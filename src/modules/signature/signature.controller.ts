import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import axios from 'axios';

import { SignatureDto } from './dto/signatureDto';
import { SignatureService } from './signature.service';

@Controller('signature')
export class SignatureController {
  constructor(public readonly signatureService: SignatureService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify signature XML',
    type: SignatureDto,
  })
  async verifySignature(@Body() signatureData: SignatureDto) {
    const result = await this.signatureService.sendSignature(signatureData);
    return result;
  }
}
