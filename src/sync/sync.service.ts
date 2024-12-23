import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Sync } from './sync.entity';
import { WebsocketServer } from '../ws.server';

@Injectable()
export class SyncService {
  constructor(private readonly em: EntityManager) {}

  async getTree(userId: number): Promise<Buffer | null> {
    const sync = await this.em.findOne(Sync, { user: userId });
    return sync?.tree || null;
  }

  async putTree(userId: number, tree: Buffer, clientId: string): Promise<void> {
    let sync = await this.em.findOne(Sync, { user: userId });
    if (!sync) {
      sync = new Sync();
      sync.user = this.em.getReference('User', userId);
    }
    sync.tree = tree;
    await this.em.persistAndFlush(sync);
    WebsocketServer.getInstance().sendToUser(userId, 'treeUpdated', { clientId });
  }
}
