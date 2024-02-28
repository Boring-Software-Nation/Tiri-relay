import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { SettingsController } from './settings.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "../user/user.entity";
import {Settings} from "./settings.entity";


@Module({
  controllers: [
    SettingsController,
  ],
  imports: [UserModule, MikroOrmModule.forFeature({ entities: [Settings] })],
  providers: [],
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'settings/:wallet/subscription', method: RequestMethod.GET },
        { path: 'settings/version', method: RequestMethod.GET },
      );
  }
}
