import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import type { File as MulterFile } from 'multer';
import { ImageService } from './image.service';
import { Public } from '../../../common/decorators/public/public.decorator';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Public()
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  create(@UploadedFiles() files: MulterFile[], @Req() request: Request) {
    if (!files?.length) {
      throw new BadRequestException(
        'Debe enviar entre 1 y 5 archivos en el campo files',
      );
    }

    return this.imageService.create(files, request);
  }

  @Public()
  @Get()
  findAll(@Req() request: Request) {
    return this.imageService.findAll(request);
  }

  @Public()
  @Get(':fileName')
  findOne(@Param('fileName') fileName: string): Promise<StreamableFile> {
    return this.imageService.findOne(fileName);
  }
}
