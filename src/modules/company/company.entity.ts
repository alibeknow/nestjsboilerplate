import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyDto } from './dto/company-dto';

@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity<CompanyDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  bin: string;

  @Column({ nullable: true })
  isActive: boolean;

  @OneToMany((type) => UserEntity, (user) => user.company) // note: we will create author property in the Photo class below
  employes: UserEntity[];

  dtoClass = CompanyDto;
}
