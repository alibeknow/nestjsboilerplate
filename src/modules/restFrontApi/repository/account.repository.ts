import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { AccountEntity } from './account.entity';

@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {}
