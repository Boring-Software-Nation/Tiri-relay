import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { Sync } from './sync.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Sync])],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
