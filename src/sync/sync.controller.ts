import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { Request } from 'express';
import { IUserData } from '../user/user.interface';

type RequestWithUser = Request & { user?: IUserData & { id?: number } };

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('tree')
  async getTree(@Req() request: RequestWithUser): Promise<Buffer | null> {
    const userId = request.user.id;
    return this.syncService.getTree(userId);
  }

  @Put('tree')
  async putTree(@Req() request: RequestWithUser, @Body() body: { tree: string }): Promise<void> {
    const userId = request.user.id;
    const treeBuffer = Buffer.from(body.tree, 'base64'); // Assuming the client sends the tree as a base64 string
    await this.syncService.putTree(userId, treeBuffer);
  }
}
