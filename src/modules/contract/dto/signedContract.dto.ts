import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SignedContractDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contractNumber?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contractDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  operatorPosition?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  operatorFio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  operatorDoc?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  bin?: string;

  @IsOptional()
  companyId?: string;

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
  phone: string;
}
