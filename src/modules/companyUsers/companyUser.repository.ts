import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CompanyUsersEntity } from './companyUser.entity';
@EntityRepository(CompanyUsersEntity)
export class CompanyUserRepository extends Repository<CompanyUsersEntity> {}
