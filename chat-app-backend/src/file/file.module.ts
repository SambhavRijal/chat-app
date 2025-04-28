import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
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
  providers: [FileService],
  controllers: [FileController],
  exports: [MulterModule],
})
export class FileModule {}
