import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import type { File as MulterFile } from 'multer';
import { ImageService } from './image.service';
import { Public } from '../../../common/decorators/public/public.decorator';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {
    console.log('[ImageController] constructed');
  }

  @Public()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files', maxCount: 5 },
      { name: 'file', maxCount: 5 },
    ]),
  )
  create(
    @UploadedFiles()
    fields: {
      files?: MulterFile[];
      file?: MulterFile[];
    },
    @Req() request: Request,
  ) {
    const files = [...(fields?.files ?? []), ...(fields?.file ?? [])];

    console.log('[ImageController] POST /image received', {
      totalFiles: files.length,
      fieldKeys: Object.keys(fields ?? {}),
      filenames: files.map((item) => item.originalname),
      contentTypes: files.map((item) => item.mimetype),
      ip: request.ip,
    });

    if (!files?.length) {
      throw new BadRequestException(
        'Debe enviar entre 1 y 5 archivos en el campo files o file',
      );
    }

    return this.imageService.create(files, request);
  }

  @Public()
  @Get()
  findAll(@Req() request: Request) {
    console.log('[ImageController] GET /image called', {
      ip: request.ip,
      host: request.get('host'),
    });
    return this.imageService.findAll(request);
  }

  @Public()
  @Get(':fileName')
  findOne(@Param('fileName') fileName: string): Promise<StreamableFile> {
    console.log('[ImageController] GET /image/:fileName called', { fileName });
    return this.imageService.findOne(fileName);
  }
}
