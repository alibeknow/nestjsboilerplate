import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';
export class UpdateCompanyDto {
  @ApiPropertyOptional()
  @IsString()
  companyId: string;
}
