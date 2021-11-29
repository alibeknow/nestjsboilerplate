import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyType } from '../../common/constants/company-type';
import { SignedContractDto } from '../contract/dto/signedContract.dto';
import { DocumentEntity } from '../contract/entities/document.entity';
import { LogEntity } from '../logger/log.entity';
import { AccountEntity } from '../restFrontApi/repository/account.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyDto } from './dto/company-dto';

@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  bin: string;

  @Column({ nullable: true })
  iban: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  jsonData: SignedContractDto;

  @Column({ type: 'enum', enum: CompanyType, default: CompanyType.JSC })
  companyType: CompanyType;

  @OneToMany((type) => UserEntity, (user) => user.company) // note: we will create author property in the Photo class below
  employes: UserEntity[];

  @OneToMany((type) => DocumentEntity, (document) => document.company) // note: we will create author property in the Photo class below
  documents: DocumentEntity[];

  @OneToMany((type) => AccountEntity, (account) => account.company) // note: we will create author property in the Photo class below
  accounts: AccountEntity[];

  @OneToMany((type) => LogEntity, (log) => log.company) // note: we will create author property in the Photo class below
  logs: LogEntity[];
  dtoClass = CompanyDto;
}
