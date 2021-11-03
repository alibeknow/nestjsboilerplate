import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogDto {
  @ApiPropertyOptional()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsString()
  context: string;

  @ApiPropertyOptional()
  @IsString()
  level: string;
}
