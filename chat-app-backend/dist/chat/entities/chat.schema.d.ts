import { Document, Schema as MongooseSchema } from 'mongoose';
export type ChatMessageDocument = ChatMessage & Document;
export declare class ChatMessage {
    username: string;
    text: string;
    image: string;
    createdAt: Date;
}
export declare const ChatMessageSchema: MongooseSchema<ChatMessage, import("mongoose").Model<ChatMessage, any, any, any, Document<unknown, any, ChatMessage> & ChatMessage & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatMessage, Document<unknown, {}, import("mongoose").FlatRecord<ChatMessage>> & import("mongoose").FlatRecord<ChatMessage> & {
    _id: import("mongoose").Types.ObjectId;
}>;
