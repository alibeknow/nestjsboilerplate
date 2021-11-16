import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { Status } from '../../../common/constants/status';
export class DeclineDocument {
  @ApiProperty({ type: Status })
  @IsEnum(Status)
  status: Status;
  @IsString()
  bin: string;

  @IsString()
  comments: string;
}
