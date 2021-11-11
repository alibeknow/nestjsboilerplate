import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SetMainDto {
  @ApiProperty()
  @IsString()
  iban: string;
  @ApiProperty()
  @IsUUID()
  companyId: string;
}
