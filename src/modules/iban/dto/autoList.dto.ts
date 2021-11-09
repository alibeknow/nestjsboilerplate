import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AutoListDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsString()
  page = 0;
  @IsString()
  @ApiProperty()
  size = 20;
}
