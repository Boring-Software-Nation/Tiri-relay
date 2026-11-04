import { Migration } from '@mikro-orm/migrations';

export class Migration20240228142343 extends Migration {

  async up(): Promise<void> {
    this.addSql(`
      create table sync (
        id int unsigned not null auto_increment primary key,
        user_id int unsigned not null unique,
        tree MEDIUMBLOB not null,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
      default character set utf8mb4 engine = InnoDB;
    `);
  }

  async down(): Promise<void> {

  }

}
