import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { CompanyUserService } from './companyUser.service';
import { CompanyUsersDto } from './dto/companyUsers.dto';
import { CompanyUsersDto2 } from './dto/companyUsers2.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';

@Controller('companyUsers')
@ApiTags('companyUsers')
export class CompanyUserController {
  constructor(private companyUserService: CompanyUserService) {}
  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: CompanyUsersDto,
  })
  addCompanyUsers(@Body() cUser: CompanyUsersDto2) {
    return this.companyUserService.createUser(cUser);
  }

  @Get('all')
  @Auth([RoleType.ADMIN])
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
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: CompanyUsersDto,
  })
  getUser(@UUIDParam('id') userId: string): Promise<CompanyUsersDto> {
    console.log(userId);
    return this.companyUserService.getUser(userId);
  }
}
