import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import type { File as MulterFile } from 'multer';
import { PdfService } from './pdf.service';
import { Public } from '../../../common/decorators/public/public.decorator';

@Controller('file')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: MulterFile, @Req() request: Request) {
    if (!file) {
      throw new BadRequestException('Debe enviar un archivo en el campo file');
    }

    return this.pdfService.create(file, request);
  }

  @Public()
  @Get()
  findAll(@Req() request: Request) {
    return this.pdfService.findAll(request);
  }

  @Public()
  @Get(':fileName')
  findOne(@Param('fileName') fileName: string): Promise<StreamableFile> {
    return this.pdfService.findOne(fileName);
  }
}
