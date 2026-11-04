import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../user/auth.middleware';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sync } from './sync.entity';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([Sync])],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'sync/tree', method: RequestMethod.GET },
        { path: 'sync/tree', method: RequestMethod.PUT },
      );
  }
}
