"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_schema_1 = require("./entities/chat.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ChatService = class ChatService {
    constructor(chatMessageModel) {
        this.chatMessageModel = chatMessageModel;
        this.connectedClients = new Map();
    }
    async createMessage(username, text, image) {
        const message = await this.chatMessageModel.create({
            username,
            text,
            image: image?.filename ?? '',
        });
        await this.broadcastMessage(message);
        return message;
    }
    async getAllMessages() {
        return this.chatMessageModel.find().sort({ createdAt: 1 }).exec();
    }
    addClient(username, client) {
        this.connectedClients.set(username, client);
        console.log(`Client added: ${username}`);
        console.log('Connected clients:', Array.from(this.connectedClients.keys()));
    }
    removeClient(username) {
        this.connectedClients.delete(username);
        console.log(`Client removed: ${username}`);
        console.log('Connected clients:', Array.from(this.connectedClients.keys()));
    }
    async broadcastMessage(message) {
        console.log('Broadcasting message to clients:', this.connectedClients.size);
        this.connectedClients.forEach((client, username) => {
            client.emit('newMessage', message);
        });
    }
    getConnectedUsers() {
        return Array.from(this.connectedClients.keys());
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.ChatMessage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map