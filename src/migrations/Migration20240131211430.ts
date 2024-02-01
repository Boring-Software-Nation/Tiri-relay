import { Migration } from '@mikro-orm/migrations';

export class Migration20240131211430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `was_trial` tinyint default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `was_trial`;');
  }

}
