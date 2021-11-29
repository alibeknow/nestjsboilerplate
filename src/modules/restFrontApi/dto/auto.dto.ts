import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AutoDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsString()
  licencePlate: string;
}
