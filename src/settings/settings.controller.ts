import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EntityManager } from '@mikro-orm/mysql';
import { Settings } from './settings.entity';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly em: EntityManager) {}

  @Get('version')
  @ApiOperation({ summary: 'Latest desktop app version (for the "new version available" notice)' })
  async version(): Promise<{ last_version: string }> {
    const lastVersion = await this.em.fork().findOne(Settings, { key: 'last_version' });
    return { last_version: lastVersion ? lastVersion.value : '' };
  }
}
