import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class SignatureDocumentDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  readonly signedXml: string;
}
