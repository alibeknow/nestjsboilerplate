import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { AssetsDto } from '../dto/assets.dto';
import { DocumentEntity } from './document.entity';

@Entity({ name: 'assets' })
export class AssetsEntity extends AbstractEntity<AssetsDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  mimeType: string;

  @ManyToOne((type) => DocumentEntity, (document) => document.assets)
  document: DocumentEntity;

  dtoClass = AssetsDto;
}
