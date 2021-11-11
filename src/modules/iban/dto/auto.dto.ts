import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AutoDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsString()
  licencePlate: string;
}
