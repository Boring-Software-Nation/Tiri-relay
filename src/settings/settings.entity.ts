import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

/** Simple key/value settings, e.g. key "last_version". */
@Entity({ tableName: 'settings' })
export class Settings {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  key?: string;

  @Property({ type: 'text', nullable: true })
  value?: string;
}
