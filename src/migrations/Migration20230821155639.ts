import { Migration } from '@mikro-orm/migrations';

export class Migration20211219155639 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `wallet` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');


  }

}
