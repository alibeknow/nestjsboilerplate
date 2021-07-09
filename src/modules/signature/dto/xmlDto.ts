import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class XMLDto {
  @ApiProperty()
  @IsString()
  readonly xml: string;
}
