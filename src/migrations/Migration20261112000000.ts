import { Migration } from '@mikro-orm/migrations';

/**
 * Wallet sign-in and versioned sync tree (Filecoin migration).
 *
 * Users are now identified by their wallet address, and old accounts (identified by a
 * hash of a Sia seed) can't be mapped to addresses. Nothing is deleted: the old tables
 * are renamed to legacy_user / legacy_sync so an operator can inspect, export and drop
 * them deliberately. NOTE: legacy_user.pay_wallet_seed holds Sia seeds in plain text;
 * drop that table once anything needed from it has been recovered.
 */
export class Migration20261112000000 extends Migration {
  async up(): Promise<void> {
    this.addSql('rename table `sync` to `legacy_sync`, `user` to `legacy_user`;');

    this.addSql(
      'create table `user` (' +
        '`id` int unsigned not null auto_increment primary key, ' +
        '`address` varchar(42) not null, ' +
        '`created_at` datetime not null, ' +
        '`last_login_at` datetime null, ' +
        'unique key `user_address_unique` (`address`)' +
        ') default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'create table `sync` (' +
        '`id` int unsigned not null auto_increment primary key, ' +
        '`user_id` int unsigned not null, ' +
        '`tree` mediumblob not null, ' +
        '`version` int unsigned not null default 0, ' +
        '`updated_at` datetime not null, ' +
        'unique key `sync_user_id_unique` (`user_id`), ' +
        'constraint `sync_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade' +
        ') default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'create table `auth_challenge` (' +
        '`id` int unsigned not null auto_increment primary key, ' +
        '`nonce` varchar(64) not null, ' +
        '`address` varchar(42) not null, ' +
        '`message` text not null, ' +
        '`expires_at` datetime not null, ' +
        '`used_at` datetime null, ' +
        '`created_at` datetime not null, ' +
        'unique key `auth_challenge_nonce_unique` (`nonce`), ' +
        'key `auth_challenge_expires_at_index` (`expires_at`)' +
        ') default character set utf8mb4 engine = InnoDB;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `auth_challenge`;');
    this.addSql('drop table if exists `sync`;');
    this.addSql('drop table if exists `user`;');
    this.addSql('rename table `legacy_sync` to `sync`, `legacy_user` to `user`;');
  }
}
