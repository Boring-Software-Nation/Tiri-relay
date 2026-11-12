import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * A Tiri user is identified only by their wallet address. There are no passwords
 * or emails: the user proves ownership by signing a sign-in challenge.
 */
@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey()
  id!: number;

  /** EIP-55 checksummed address, e.g. 0xf39F...2266 */
  @Property({ length: 42, unique: true })
  address!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true })
  lastLoginAt?: Date;

  constructor(address: string) {
    this.address = address;
  }
}
