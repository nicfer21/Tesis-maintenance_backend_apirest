import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { OnModuleInit } from '@nestjs/common';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule implements OnModuleInit {
  onModuleInit() {
    console.log('[ImageModule] initialized');
  }
}
