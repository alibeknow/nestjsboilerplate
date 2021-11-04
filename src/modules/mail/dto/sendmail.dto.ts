import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
export class SendEmail {
  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  subject: string;

  @ApiPropertyOptional()
  content: EmailTemplate;
}

export enum EmailTemplate {
  SIGNED = 'SIGNED',
  SIGNEDOPERATOR = 'SIGNEDOPERATOR',
  SIGNEDCOMPLETE = 'SIGNEDCOMPLETE',
  SIGNEDREJECTED = 'SIGNEDREJECTED',
}
