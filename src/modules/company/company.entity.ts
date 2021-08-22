import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { DocumentEntity } from '../document/document.entity';
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

  @OneToMany((type) => UserEntity, (user) => user.company) // note: we will create author property in the Photo class below
  employes: UserEntity[];

  @OneToMany((type) => DocumentEntity, (document) => document.company) // note: we will create author property in the Photo class below
  documents: DocumentEntity[];

  dtoClass = CompanyDto;
}
