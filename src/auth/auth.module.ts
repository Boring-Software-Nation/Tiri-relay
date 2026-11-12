import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthChallenge } from './auth-challenge.entity';
import { User } from '../user/user.entity';
import { ChainModule } from '../chain/chain.module';

@Module({
  imports: [MikroOrmModule.forFeature([AuthChallenge, User]), ChainModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
