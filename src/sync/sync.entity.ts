import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { User } from '../user/user.entity';

@Entity()
export class Sync {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, { onDelete: 'cascade' })
  user!: User;

  @Property({ type: 'blob' })
  tree!: Buffer;
}
