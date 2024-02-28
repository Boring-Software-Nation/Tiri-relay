import { IsEmail } from 'class-validator';
import crypto from 'crypto';
import {
  Collection,
  Entity, EntityDTO,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { SettingsRepository } from './settings.repository';

@Entity({ customRepository: () => SettingsRepository })
export class Settings {

  [EntityRepositoryType]?: SettingsRepository;

  @PrimaryKey()
  id: number;

  @Property()
  key: string;

  @Property()
  value: string;

  constructor() {
  }

  toJSON(settings?: Settings) {
    const o = wrap<Settings>(this).toObject() as SettingsDTO;

    return o;
  }

}

interface SettingsDTO extends EntityDTO<Settings> {
  last_version: string;
}
