import { Injectable } from '@nestjs/common';
import { ChatMessage, ChatMessageDocument } from './entities/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private connectedClients: Map<string, Socket> = new Map();

  constructor(
    @InjectModel(ChatMessage.name)
    private readonly chatMessageModel: Model<ChatMessageDocument>,
  ) {}

  async createMessage(
    username: string,
    text: string,
    image: Express.Multer.File,
  ): Promise<ChatMessage> {
    const message = await this.chatMessageModel.create({
      username,
      text,
      image: image?.filename ?? '',
    });
    await this.broadcastMessage(message);
    return message;
  }

  async getAllMessages(): Promise<ChatMessage[]> {
    return this.chatMessageModel.find().sort({ createdAt: 1 }).exec();
  }

  addClient(username: string, client: Socket) {
    this.connectedClients.set(username, client);
    console.log(`Client added: ${username}`);
    console.log('Connected clients:', Array.from(this.connectedClients.keys()));
  }

  removeClient(username: string) {
    this.connectedClients.delete(username);
    console.log(`Client removed: ${username}`);
    console.log('Connected clients:', Array.from(this.connectedClients.keys()));
  }

  private async broadcastMessage(message: ChatMessage) {
    console.log('Broadcasting message to clients:', this.connectedClients.size);
    this.connectedClients.forEach((client, username) => {
      client.emit('newMessage', message);
    });
  }

  getConnectedUsers(): string[] {
    return Array.from(this.connectedClients.keys());
  }
}
