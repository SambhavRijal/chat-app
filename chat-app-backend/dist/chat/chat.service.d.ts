import { ChatMessage, ChatMessageDocument } from './entities/chat.schema';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
export declare class ChatService {
    private readonly chatMessageModel;
    private connectedClients;
    constructor(chatMessageModel: Model<ChatMessageDocument>);
    createMessage(username: string, text: string, image: Express.Multer.File): Promise<ChatMessage>;
    getAllMessages(): Promise<ChatMessage[]>;
    addClient(username: string, client: Socket): void;
    removeClient(username: string): void;
    private broadcastMessage;
    getConnectedUsers(): string[];
}
