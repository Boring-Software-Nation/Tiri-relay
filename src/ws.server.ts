import { Server as HTTPServer } from "https";
import { Server as IOServer, Socket } from "socket.io";
import jwt from 'jsonwebtoken';
import { AppConfig } from "./app.config";
import { User } from "./user/user.entity";

export class WebsocketServer{
  private static instance: WebsocketServer;

  static getInstance(httpServer?: HTTPServer): WebsocketServer {
    if (!WebsocketServer.instance) {
      if (!httpServer) {
        throw new Error('WS: HTTP server is required');
      }
      WebsocketServer.instance = new WebsocketServer(httpServer);
    }
    return WebsocketServer.instance;
  }

  private io: IOServer;

  constructor(httpServer: HTTPServer) {
    this.io = new IOServer(httpServer, { cors: { origin: '*' } });
    this.io.on('connection', (socket) => this.handleConnection(socket));
    console.log("WS: Websocket server has been created");
  }

  async handleConnection(client: Socket) {
    //console.log('WS: Client connected:', client.id);

    try {
      const token = client.handshake.auth.token;
      const decoded: any = jwt.verify(token, AppConfig.get('AUTH_SECRET'));
      //console.log('WS: Decoded auth:', decoded);
      const em = AppConfig.orm.em.fork();
      const user = await em.findOne<User>('User', { id: decoded.id });
      if (!user) {
        throw new Error(`User not found. ID: ${decoded.id}`);
      }
      console.log('WS: User authenticated:', user.id);
      client.join(`user:${user.id}`);
    } catch (err) {
      console.error('WS: Unauthorized WebSocket connection:', err.message);
      client.disconnect();
    }
  }

  sendToUser(userId: number, event: string, data: any) {
    this.io.to(`user:${userId}`).emit(event, data);
  }
}
