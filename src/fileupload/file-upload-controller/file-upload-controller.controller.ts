import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { throwError } from 'rxjs';
@Controller('file-upload-s3')
export class FileUploadControllerController {
    private s3 = new AWS.S3({
        accessKeyId: '######',
        secretAccessKey: '#####',
        region: '####'
    });

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
      const params = {
        Bucket: 'mytestbucket204',
        Key: file.originalname,
        Body: file.buffer,
      };
  
      try {
        const data = await this.s3.upload(params).promise();
        return { url: data.Location };
      } catch (error) {
        // Handle error
        console.error(error);
        throw new Error('Failed to upload file to S3');
      }
    }
}
