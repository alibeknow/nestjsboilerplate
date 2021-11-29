import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { AssetsEntity } from '../entities/assets.entity';
@EntityRepository(AssetsEntity)
export class AssetsRepository extends Repository<AssetsEntity> {}
