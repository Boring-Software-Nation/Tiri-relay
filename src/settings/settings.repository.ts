import { EntityRepository } from '@mikro-orm/mysql';
import { Settings } from './settings.entity';

export class SettingsRepository extends EntityRepository<Settings> {

}
