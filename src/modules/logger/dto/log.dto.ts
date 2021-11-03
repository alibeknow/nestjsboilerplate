import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
export class LogDto extends AbstractDto {
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
