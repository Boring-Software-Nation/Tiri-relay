import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ObjectsModule } from './objects/objects.module';
import { UserModule } from './user/user.module';
import {AppConfig} from "./app.config";

@Module({
  controllers: [
    AppController,
  ],
  imports: [
    MikroOrmModule.forRoot(),
    ObjectsModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
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
