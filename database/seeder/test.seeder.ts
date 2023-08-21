import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../src/user/user.entity';

export class TestSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const author = em.create(User, {
      wallet: '',
      password: 'snow@wall.st',
    });
    em.persist(author);
  }

}
