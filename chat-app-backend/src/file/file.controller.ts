import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('file')
export class FileController {
  @Get('get-file/:filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './uploads' });
  }
}
