import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class SendEmail extends AbstractDto {
  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  subject: string;

  @ApiPropertyOptional()
  @IsString()
  content?: boolean;
}
