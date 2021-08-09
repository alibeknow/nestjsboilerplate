import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Status } from '../../common/constants/status';
import { CompanyEntity } from '../company/company.entity';
import { DocumentDto } from './dto/document-dto';

@Entity({ name: 'documents' })
export class DocumentEntity extends AbstractEntity<DocumentDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
  @Column({ nullable: true })
  isActive: boolean;
  @Column({ type: 'text', nullable: false })
  body: string;
  @ManyToOne((type) => CompanyEntity, (company) => company.documents, {
    eager: true,
  })
  company: CompanyEntity;

  dtoClass = DocumentDto;
}
