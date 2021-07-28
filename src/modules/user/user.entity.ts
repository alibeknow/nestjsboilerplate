import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import { CompanyEntity } from '../company/company.entity';
import { DocumentEntity } from '../document/document.entity';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;
  @Column({ nullable: true })
  idn: string;

  @VirtualColumn()
  fullName: string;

  @OneToMany((type) => DocumentEntity, (document) => document) // note: we will create author property in the Photo class below
  documents: DocumentEntity[];

  @ManyToOne((type) => CompanyEntity, (company) => company.employes)
  company: CompanyEntity;
  dtoClass = UserDto;
}
