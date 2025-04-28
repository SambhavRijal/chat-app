import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ transports: ['websocket'], cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const username = client.handshake.query.username as string;
    if (username) {
      this.chatService.addClient(username, client);
    } else {
      console.log('Client connected without username');
    }
  }

  handleDisconnect(client: Socket) {
    const username = client.handshake.query.username as string;
    if (username) {
      this.chatService.removeClient(username);
    } else {
      console.log('Disconnected client without username');
    }
  }
}
