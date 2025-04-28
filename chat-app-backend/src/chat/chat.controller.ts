import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './entities/chat.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(): Promise<ChatMessage[]> {
    return this.chatService.getAllMessages();
  }

  @Post('create-message')
  @UseInterceptors(FileInterceptor('image'))
  async createMessage(
    @Body() msgDto: any,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ChatMessage> {
    console.log(image);
    return this.chatService.createMessage(msgDto.username, msgDto.text, image);
  }
}
