import { Migration } from '@mikro-orm/migrations';

export class Migration20240131211430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` change `password` `password` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` change `password` `password` varchar(255) not null;');
  }

}
