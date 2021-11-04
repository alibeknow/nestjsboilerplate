import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsOptional()
  user_id?: string;
}
