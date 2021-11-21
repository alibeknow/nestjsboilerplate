import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class AccountFillpageDto {
  @ApiPropertyOptional()
  @IsString()
  accountNumber: string;

  @ApiPropertyOptional()
  @IsInt()
  size = 20;

  @ApiPropertyOptional()
  @IsInt()
  page = 0;
}
