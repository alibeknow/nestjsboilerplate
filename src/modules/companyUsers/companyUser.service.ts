import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import type { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import type { CompanyUsersEntity } from './companyUser.entity';
import { CompanyUserRepository } from './companyUser.repository';
import type { CompanyUsersDto } from './dto/companyUsers.dto';
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

  async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<CompanyUsersEntity> {
    const user = this.companyUserRepository.create(userRegisterDto);
    return this.companyUserRepository.save(user);
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<CompanyUsersDto>> {
    const queryBuilder = this.companyUserRepository.createQueryBuilder('user');
    const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: string): Promise<CompanyUsersDto> {
    const queryBuilder =
      this.companyUserRepository.createQueryBuilder('companyUser');

    queryBuilder.where('user.id = :userId', { userId });

    const companyUserEntity = await queryBuilder.getOne();

    return companyUserEntity.toDto();
  }
}
