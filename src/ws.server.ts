import { Server as HTTPServer } from 'http';
import { Server as HTTPSServer } from 'https';
import { Server as IOServer, Socket } from 'socket.io';
import { AuthService } from './auth/auth.service';

/**
 * Change notifications to a user's devices. A device connects with its session token
 * (`auth: { token }`) and joins its user's room; `treeUpdated { clientId, version }`
 * is sent to that room whenever a new tree version is stored.
 */
export class WebsocketServer {
  private static instance: WebsocketServer | undefined;

  static init(httpServer: HTTPServer | HTTPSServer): WebsocketServer {
    WebsocketServer.instance?.close();
    WebsocketServer.instance = new WebsocketServer(httpServer);
    return WebsocketServer.instance;
  }

  static tryGetInstance(): WebsocketServer | undefined {
    return WebsocketServer.instance;
  }

  private io: IOServer;

  private constructor(httpServer: HTTPServer | HTTPSServer) {
    this.io = new IOServer(httpServer, { cors: { origin: '*' } });
    this.io.use((socket, next) => {
      try {
        const claims = AuthService.verifyToken(String(socket.handshake.auth?.token ?? ''));
        socket.data.userId = claims.id;
        next();
      } catch {
        next(new Error('unauthorized'));
      }
    });
    this.io.on('connection', (socket: Socket) => {
      socket.join(`user:${socket.data.userId}`);
    });
  }

  sendToUser(userId: number, event: string, data: unknown) {
    this.io.to(`user:${userId}`).emit(event, data);
  }

  close() {
    this.io.close();
  }
}
