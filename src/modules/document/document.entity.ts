import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Status } from '../../common/constants/status';
import { CompanyEntity } from '../company/company.entity';
import { AssetsEntity } from '../contract/assets.entity';
import { SignatureEntity } from '../signature/repository/signatureDocument.entity';
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
  @Column({ nullable: true })
  contractNumber: string;

  @Column({ nullable: true, type: 'timestamp' })
  dateSign: Date;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  enableResign: boolean;

  @Column({ nullable: true })
  asset: string;

  @ManyToOne((type) => CompanyEntity, (company) => company.documents)
  company: CompanyEntity;
  @OneToMany((type) => SignatureEntity, (signature) => signature.document, {
    cascade: ['insert', 'update'],
  })
  signatures: SignatureEntity[];

  @OneToMany((type) => AssetsEntity, (assets) => assets.document, {
    cascade: ['insert', 'update'],
  })
  assets: AssetsEntity[];

  dtoClass = DocumentDto;
}
