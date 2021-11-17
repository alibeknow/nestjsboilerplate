import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyUsersDto } from './dto/companyUsers.dto';
@Entity({ name: 'companyUsers' })
export class CompanyUsersEntity extends AbstractEntity<CompanyUsersDto> {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  position: string;
  @Column({ nullable: true })
  operatorDoc: string;
  @Column({ default: false, type: 'boolean' })
  isMain: boolean;

  dtoClass = CompanyUsersDto;
}
