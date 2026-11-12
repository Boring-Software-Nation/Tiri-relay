import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { AuthService, SessionClaims } from './auth.service';

export type AuthedRequest = { user: SessionClaims };

/** Requires `Authorization: Bearer <session token>` from wallet sign-in. */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header: string | undefined = req.headers?.authorization;
    const match = header?.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      throw new UnauthorizedException('Sign in required');
    }
    try {
      req.user = AuthService.verifyToken(match[1]);
      return true;
    } catch {
      throw new UnauthorizedException('Session expired or invalid; sign in again');
    }
  }
}

/** The signed-in user's claims ({ id, address }). Use on routes protected by AuthGuard. */
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): SessionClaims => {
  return ctx.switchToHttp().getRequest().user;
});
