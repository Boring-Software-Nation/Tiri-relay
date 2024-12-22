import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust the origin as per your needs
  },
})
@Injectable()
export class WebsocketGateway {
  constructor(
      private configService: ConfigService,
      private readonly orm: MikroORM
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const decoded: any = jwt.verify(token, this.configService.get<string>('AUTH_SECRET'));
      console.log('Decoded auth:', decoded);
      const em = this.orm.em.fork();
      const user = await em.findOne('User', { id: decoded.id });
      if (!user) {
        throw new Error('User not found.');
      }
      console.log('User authenticated:', user);
    } catch (err) {
      console.error('Unauthorized WebSocket connection:', err.message);
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): string {
    console.log('Received message:', data);
    client.emit('response', { message: 'Hello from server!' });
    return 'Message received';
  }
}
