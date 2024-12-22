import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';

@Module({
  providers: [WebsocketGateway],
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class WebsocketModule {}
