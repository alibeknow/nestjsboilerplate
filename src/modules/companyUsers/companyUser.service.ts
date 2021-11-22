import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import type { CompanyUsersEntity } from './companyUser.entity';
import { CompanyUserRepository } from './companyUser.repository';
import type { CompanyUsersDto } from './dto/companyUsers.dto';
import type { CompanyUsersDto2 } from './dto/companyUsers2.dto';
import type { UsersPageOptionsDto } from './dto/users-page-options.dto';
@Injectable()
export class CompanyUserService {
  constructor(
    public readonly companyUserRepository: CompanyUserRepository,
    public readonly validatorService: ValidatorService,
  ) {}

  /**
   * Find single user
   */
  findOne(
    findData: FindConditions<CompanyUsersEntity>,
  ): Promise<CompanyUsersEntity> {
    return this.companyUserRepository.findOne(findData);
  }

  createUser(userRegisterDto: CompanyUsersDto2): Promise<CompanyUsersEntity> {
    const user = this.companyUserRepository.create(userRegisterDto);
    return this.companyUserRepository.save(user, { data: true });
  }

  async updatEuser(userRegisterDto: CompanyUsersDto) {
    return this.companyUserRepository.update(
      userRegisterDto.id,
      userRegisterDto,
    );
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<CompanyUsersDto>> {
    const queryBuilder =
      this.companyUserRepository.createQueryBuilder('companyUser');
    const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: string): Promise<CompanyUsersDto> {
    const companyUserEntity = await this.companyUserRepository.findOne(userId);

    return companyUserEntity.toDto();
  }
}
