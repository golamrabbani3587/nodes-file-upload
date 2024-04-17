import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [ FileuploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
