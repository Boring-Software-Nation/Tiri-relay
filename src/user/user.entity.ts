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
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {

  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  wallet: string;

  @Property({ hidden: true })
  password: string;

  @Property({nullable: true})
  pay_wallet_id: string;

  @Property({nullable: true})
  pay_wallet_seed: string;

  @Property({nullable: true})
  pay_addresses: string;

  @Property({nullable: true})
  plan_code: string;

  @Property({nullable: true})
  was_trial: boolean;

  constructor(wallet: string, password: string) {
    this.wallet = wallet;
    this.password = crypto.createHmac('sha256', password).digest('hex');
  }

  toJSON(user?: User) {
    const o = wrap<User>(this).toObject() as UserDTO;

    return o;
  }

}

interface UserDTO extends EntityDTO<User> {
  pay_wallet_id: string;
  addresses: string;
}
