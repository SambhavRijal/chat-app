import { ChatService } from './chat.service';
import { ChatMessage } from './entities/chat.schema';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessages(): Promise<ChatMessage[]>;
    createMessage(msgDto: any, image: Express.Multer.File): Promise<ChatMessage>;
}
