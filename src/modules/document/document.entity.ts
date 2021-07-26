import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import { DocumentDto } from './dto/document-dto';

@Entity({ name: 'documents' })
export class DocumentEntity extends AbstractEntity<DocumentDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  isActive: boolean;

  @VirtualColumn()
  dateCreate: Date;

  dtoClass = DocumentDto;
}
