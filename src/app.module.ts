import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ObjectsModule } from './objects/objects.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { AppConfig } from "./app.config";
import { SettingsModule } from "./settings/settings.module";
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailServerModule } from "./email/mail.module";
import { SyncModule } from "./sync/sync.module";

@Module({
  controllers: [
    AppController,
  ],
  imports: [
    MikroOrmModule.forRoot(),
    ObjectsModule,
    SearchModule,
    UserModule,
    MailServerModule,
    SettingsModule,
    SyncModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
          user: process.env.MAIL_ADDRESS,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      template: {
        dir: __dirname + './template/notification',
        adapter: new PugAdapter({  inlineCssEnabled: true,}),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [AppConfig],
})
export class AppModule implements NestModule, OnModuleInit {

  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MikroOrmMiddleware)
      .forRoutes('*');
  }

}
