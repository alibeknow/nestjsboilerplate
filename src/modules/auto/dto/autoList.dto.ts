import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AutoListDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsNumber()
  page = 0;
  @IsNumber()
  @ApiProperty()
  size = 20;
}
