import { EntityRepository } from '@mikro-orm/mysql';
import { Sync } from './sync.entity';

export class SyncRepository extends EntityRepository<Sync> {

}
