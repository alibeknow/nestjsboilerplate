import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { DocumentEntity } from '../../document/document.entity';
import { SignatureDocumentDto } from './../dto/signatureDocument.dto';

@Entity({ name: 'signature' })
export class SignatureEntity extends AbstractEntity<SignatureDocumentDto> {
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  fio: string;
  @Column({ nullable: true })
  isActive: boolean;
  @Column({ type: 'text', nullable: false })
  body: string;
  @ManyToOne((type) => DocumentEntity, (document) => document.signatures, {
    cascade: true,
  })
  document: DocumentEntity;

  dtoClass = SignatureDocumentDto;
}
