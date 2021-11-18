import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { Status } from '../../../common/constants/status';
export class DeclineDocument {
  @IsString()
  bin: string;
  @IsString()
  comments: string;
}
