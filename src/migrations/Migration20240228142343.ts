import { Migration } from '@mikro-orm/migrations';

export class Migration20240228142343 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `settings` (`id` int unsigned not null auto_increment primary key, `key` varchar(255), `value` text ) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {

  }

}
