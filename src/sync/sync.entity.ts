import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../user/user.entity';

/**
 * The user's encrypted file tree. The relay can't read it; it only keeps the
 * latest copy and its version number, and enforces that updates are based on
 * the current version (compare-and-swap).
 */
@Entity({ tableName: 'sync' })
export class Sync {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, { onDelete: 'cascade', unique: true })
  user!: User;

  @Property({ type: 'blob' })
  tree!: Buffer;

  /** Starts at 1 for the first stored tree and grows by 1 with every accepted update. */
  @Property({ default: 0 })
  version: number = 0;

  @Property()
  updatedAt: Date = new Date();
}
