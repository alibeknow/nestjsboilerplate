import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { Status } from '../../../common/constants/status';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';

export class CompanyPageOptionsDto extends PageOptionsDto {
  @ApiProperty({ type: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status = Status.SIGNED;
}
