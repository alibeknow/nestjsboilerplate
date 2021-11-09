import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AutoDto {
  @ApiProperty()
  @IsNumber()
  accountNumber: number;
  @ApiProperty()
  @IsString()
  licencePlate: string;
}
