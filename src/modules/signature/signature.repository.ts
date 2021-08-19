import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { SignatureEntity } from './signatureDocument.entity';

@EntityRepository(SignatureEntity)
export class SignatureRepository extends Repository<SignatureEntity> {}
