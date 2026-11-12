import { BadRequestException, ConflictException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Sync } from './sync.entity';
import { WebsocketServer } from '../ws.server';
import { MAX_TREE_BYTES } from '../config';

export class TreeVersionConflict extends ConflictException {
  constructor(currentVersion: number) {
    super({
      statusCode: 409,
      error: 'Conflict',
      message: `The tree changed on another device. Download version ${currentVersion}, re-apply your changes and try again.`,
      currentVersion,
    });
  }
}

@Injectable()
export class SyncService {
  constructor(private readonly em: EntityManager) {}

  async getTree(userId: number): Promise<{ tree: string | null; version: number; updatedAt: string | null }> {
    const sync = await this.em.fork().findOne(Sync, { user: userId });
    if (!sync) return { tree: null, version: 0, updatedAt: null };
    return { tree: sync.tree.toString('base64'), version: sync.version, updatedAt: sync.updatedAt.toISOString() };
  }

  /**
   * Stores a new tree only if it is based on the current version (compare-and-swap).
   * `baseVersion` is 0 for a user's very first tree.
   */
  async putTree(userId: number, tree: Buffer, baseVersion: number, clientId: string): Promise<{ version: number }> {
    if (tree.length === 0) {
      throw new BadRequestException('Empty tree');
    }
    if (tree.length > MAX_TREE_BYTES) {
      throw new PayloadTooLargeException(`Tree is ${tree.length} bytes; the limit is ${MAX_TREE_BYTES}`);
    }
    const knex = this.em.getKnex();
    const now = new Date();
    let newVersion: number;

    if (baseVersion === 0) {
      try {
        await knex('sync').insert({ user_id: userId, tree, version: 1, updated_at: now });
        newVersion = 1;
      } catch (err: any) {
        if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
          throw new TreeVersionConflict(await this.currentVersion(userId));
        }
        throw err;
      }
    } else {
      // Atomic: only one of several simultaneous updates based on the same version can win.
      const updated = await knex('sync')
        .where({ user_id: userId, version: baseVersion })
        .update({ tree, version: baseVersion + 1, updated_at: now });
      if (updated !== 1) {
        throw new TreeVersionConflict(await this.currentVersion(userId));
      }
      newVersion = baseVersion + 1;
    }

    WebsocketServer.tryGetInstance()?.sendToUser(userId, 'treeUpdated', { clientId, version: newVersion });
    return { version: newVersion };
  }

  private async currentVersion(userId: number): Promise<number> {
    const row = await this.em.getKnex()('sync').where({ user_id: userId }).first('version');
    return row?.version ?? 0;
  }
}
