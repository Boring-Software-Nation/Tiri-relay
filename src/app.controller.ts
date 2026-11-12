import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EntityManager } from '@mikro-orm/mysql';
import { ChainService } from './chain/chain.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(
    private readonly em: EntityManager,
    private readonly chain: ChainService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Database and Filecoin network status' })
  async health() {
    let database: { ok: boolean; error?: string };
    try {
      await this.em.getConnection().execute('select 1');
      database = { ok: true };
    } catch (err: any) {
      database = { ok: false, error: String(err?.message ?? err).slice(0, 200) };
    }
    const filecoin = await this.chain.status();
    // Sign-in and sync work without the Filecoin network, so a chain outage is "degraded", not "down".
    const status = !database.ok ? 'down' : filecoin.ok ? 'ok' : 'degraded';
    return { status, database, filecoin };
  }
}
