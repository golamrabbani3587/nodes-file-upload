import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadControllerController } from './file-upload-controller.controller';

describe('FileUploadControllerController', () => {
  let controller: FileUploadControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadControllerController],
    }).compile();

    controller = module.get<FileUploadControllerController>(FileUploadControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
