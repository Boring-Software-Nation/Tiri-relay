import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AuthMiddleware } from '../user/auth.middleware';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ObjectsController } from './objects.controller';


@Module({
  controllers: [
    ObjectsController,
  ],
  imports: [UserModule],
  providers: [],
})
export class ObjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'objects/:wallet', method: RequestMethod.GET },
               { path: 'objects/:wallet', method: RequestMethod.PUT },
               { path: 'objects/:wallet', method: RequestMethod.DELETE },
        //,
        // { path: 'articles', method: RequestMethod.POST },
        // { path: 'articles/:slug', method: RequestMethod.DELETE },
        // { path: 'articles/:slug', method: RequestMethod.PUT },
        // { path: 'articles/:slug/comments', method: RequestMethod.POST },
        // { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
        // { path: 'articles/:slug/favorite', method: RequestMethod.POST },
        // { path: 'articles/:slug/favorite', method: RequestMethod.DELETE });
      );
  }
}
