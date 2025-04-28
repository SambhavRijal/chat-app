"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const file_controller_1 = require("./file.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const randomSuffix = Math.floor(Math.random() * 1000);
                        const originalName = path.parse(file.originalname).name;
                        const extension = path.extname(file.originalname);
                        const newName = `${originalName}-${randomSuffix}${extension}`;
                        cb(null, newName);
                    },
                }),
            }),
        ],
        providers: [file_service_1.FileService],
        controllers: [file_controller_1.FileController],
        exports: [platform_express_1.MulterModule],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map