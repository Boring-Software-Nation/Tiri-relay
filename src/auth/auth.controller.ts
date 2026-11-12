import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService, SessionClaims } from './auth.service';
import { AuthGuard, CurrentUser } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('challenge')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a one-time message for the wallet to sign' })
  @ApiBody({ schema: { properties: { address: { type: 'string', example: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' } } } })
  challenge(@Body('address') address: string) {
    return this.auth.createChallenge(address);
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Exchange a signed challenge for a session token' })
  @ApiBody({ schema: { properties: { address: { type: 'string' }, nonce: { type: 'string' }, signature: { type: 'string' } } } })
  verify(@Body() body: { address: string; nonce: string; signature: string }) {
    return this.auth.verify(body?.address, body?.nonce, body?.signature);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'The signed-in wallet' })
  me(@CurrentUser() user: SessionClaims) {
    return user;
  }
}
