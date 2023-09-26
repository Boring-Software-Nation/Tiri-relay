import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { SettingsController } from './settings.controller';


@Module({
  controllers: [
    SettingsController,
  ],
  imports: [UserModule],
  providers: [],
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'settings/:wallet/subscription', method: RequestMethod.GET },
      );
  }
}
