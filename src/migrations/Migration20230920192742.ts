import { Migration } from '@mikro-orm/migrations';

export class Migration20230920192742 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `plan_code` varchar(255) null');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `plan_code`;');
  }

}
