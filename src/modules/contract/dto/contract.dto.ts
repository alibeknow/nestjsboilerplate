import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContractDto {
  @ApiPropertyOptional()
  @IsString()
  contractNumber: string;
  @ApiPropertyOptional()
  @IsString()
  contractDate: string;

  @ApiPropertyOptional()
  @IsString()
  operatorPosition?: string;

  @ApiPropertyOptional()
  @IsString()
  operatorFio: string;

  @ApiPropertyOptional()
  @IsString()
  companyName: string;
}
