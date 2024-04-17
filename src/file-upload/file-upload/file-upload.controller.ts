import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class FileUploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads', // Specify your upload destination
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          }
        })
      }))

      async uploadFile(@UploadedFile() file){
        console.log(file);
        return { filename: file.fileName}
      }
}
