import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SignedContractDto {
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
  @ApiPropertyOptional()
  @IsString()
  operatorDoc: string;
  @ApiPropertyOptional()
  @IsString()
  userPosition: string;
  @ApiPropertyOptional()
  @IsString()
  userFio: string;
  @ApiPropertyOptional()
  @IsString()
  userDoc: string;
  @ApiPropertyOptional()
  @IsString()
  legalAddress: string;
  @ApiPropertyOptional()
  @IsString()
  factAddress: string;
  @ApiPropertyOptional()
  @IsString()
  email: string;
  @ApiPropertyOptional()
  @IsString()
  iik: string;
  @ApiPropertyOptional()
  @IsString()
  kbe: string;
  @ApiPropertyOptional()
  @IsString()
  bik: string;
  @ApiPropertyOptional()
  @IsString()
  bank: string;
  @ApiPropertyOptional()
  @IsString()
  website: string;
  @ApiPropertyOptional()
  @IsString()
  phone: string;

  @IsString()
  bin: string;
  @IsUUID()
  companyId: string;
}
