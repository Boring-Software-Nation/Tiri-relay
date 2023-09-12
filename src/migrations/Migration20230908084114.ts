import { Migration } from '@mikro-orm/migrations';

export class Migration20230908084114 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `pay_wallet_id` text null, add `pay_wallet_seed` text null, add `pay_addresses` text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `pay_wallet_id`;');
    this.addSql('alter table `user` drop `pay_wallet_seed`;');
    this.addSql('alter table `user` drop `pay_addresses`;');

  }

}
