// chat-message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema()
export class ChatMessage {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
