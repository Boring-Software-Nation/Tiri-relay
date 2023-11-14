import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { SearchController } from './search.controller';


@Module({
  controllers: [
    SearchController
  ],
  imports: [UserModule],
  providers: [],
})
export class SearchModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
           { path: 'search/objects', method: RequestMethod.GET },

      );
  }
}
