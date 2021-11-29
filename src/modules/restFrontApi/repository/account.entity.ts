import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { CompanyEntity } from '../../company/company.entity';
import { AccountDto } from '../dto/account-entity.dto';

@Entity({ name: 'accounts' })
export class AccountEntity extends AbstractEntity<AccountDto> {
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true, unique: true })
  iban: string;
  @Column({ type: 'boolean', default: false })
  isMain: boolean;

  @Column({ nullable: true })
  isActive: boolean;
  @ManyToOne((type) => CompanyEntity, (company) => company.accounts, {
    cascade: true,
  })
  company: CompanyEntity;

  dtoClass = AccountDto;
}
