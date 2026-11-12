import { BadRequestException, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import { AuthGuard, CurrentUser } from '../auth/auth.guard';
import { SessionClaims } from '../auth/auth.service';

@ApiTags('sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('tree')
  @ApiOperation({ summary: 'The current encrypted file tree and its version (version 0 = no tree yet)' })
  getTree(@CurrentUser() user: SessionClaims) {
    return this.syncService.getTree(user.id);
  }

  @Put('tree')
  @ApiOperation({
    summary: 'Store a new encrypted tree, based on the given version',
    description: 'Returns 409 with currentVersion if the tree changed since baseVersion.',
  })
  @ApiBody({
    schema: {
      properties: {
        tree: { type: 'string', description: 'Encrypted tree, base64' },
        baseVersion: { type: 'integer', description: 'Version this tree is based on; 0 for the first tree' },
        clientId: { type: 'string', description: 'Sending device, echoed in the treeUpdated event' },
      },
    },
  })
  putTree(
    @CurrentUser() user: SessionClaims,
    @Body() body: { tree: string; baseVersion: number; clientId: string },
  ) {
    if (typeof body?.tree !== 'string' || !/^[A-Za-z0-9+/_=-]*$/.test(body.tree)) {
      throw new BadRequestException('tree must be a base64 string');
    }
    if (!Number.isInteger(body.baseVersion) || body.baseVersion < 0) {
      throw new BadRequestException('baseVersion must be a non-negative integer');
    }
    if (typeof body.clientId !== 'string' || body.clientId.length === 0 || body.clientId.length > 100) {
      throw new BadRequestException('clientId is required');
    }
    const tree = Buffer.from(body.tree, 'base64');
    return this.syncService.putTree(user.id, tree, body.baseVersion, body.clientId);
  }
}
