import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SettingsController } from './settings.controller';
import { Settings } from './settings.entity';

@Module({
  controllers: [SettingsController],
  imports: [MikroOrmModule.forFeature({ entities: [Settings] })],
})
export class SettingsModule {}
