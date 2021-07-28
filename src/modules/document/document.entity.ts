import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import { UserEntity } from '../user/user.entity';
import { DocumentDto } from './dto/document-dto';

@Entity({ name: 'documents' })
export class DocumentEntity extends AbstractEntity<DocumentDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  isActive: boolean;
  @Column({ type: 'text', nullable: false })
  body: string;
  @ManyToOne((type) => UserEntity, (user) => user.documents)
  author: UserEntity;

  dtoClass = DocumentDto;
}
