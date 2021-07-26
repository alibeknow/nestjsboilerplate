import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { DocumentEntity } from './document.entity';

@EntityRepository(DocumentEntity)
export class DocumentRepository extends Repository<DocumentEntity> {}
