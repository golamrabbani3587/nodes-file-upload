import { Module } from '@nestjs/common';
import { FileUploadControllerController } from './file-upload-controller/file-upload-controller.controller';

@Module({
  controllers: [FileUploadControllerController]
})
export class FileuploadModule {}
