import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

/** A one-time sign-in challenge. Expires after CHALLENGE_TTL_SECONDS and can be used once. */
@Entity({ tableName: 'auth_challenge' })
export class AuthChallenge {
  @PrimaryKey()
  id!: number;

  @Property({ length: 64, unique: true })
  nonce!: string;

  @Property({ length: 42 })
  address!: string;

  @Property({ type: 'text' })
  message!: string;

  @Property()
  expiresAt!: Date;

  @Property({ nullable: true })
  usedAt?: Date;

  @Property()
  createdAt: Date = new Date();
}
