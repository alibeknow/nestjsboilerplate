import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { TranslationService } from '../../shared/services/translation.service';
import { CompanyUserService } from './companyUser.service';
import { CompanyUsersDto } from './dto/companyUsers.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';

@Controller('users')
@ApiTags('users')
export class CompanyUserController {
  constructor(
    private companyUserService: CompanyUserService,
    private readonly translationService: TranslationService,
  ) {}

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: PageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<CompanyUsersDto>> {
    return this.companyUserService.getUsers(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: CompanyUsersDto,
  })
  getUser(@UUIDParam('id') userId: string): Promise<CompanyUsersDto> {
    return this.companyUserService.getUser(userId);
  }
}
