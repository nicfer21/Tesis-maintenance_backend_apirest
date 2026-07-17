import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, existsSync, statSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import type { Request } from 'express';
import type { File as MulterFile } from 'multer';
import {
  FILE_STORAGE_DIR,
  buildPublicFileUrl,
  ensureStorageDir,
  listStoredFiles,
  normalizeStoredFileName,
  safeStoredName,
} from '../file-storage.util';

@Injectable()
export class PdfService {
  private readonly allowedMimeTypes = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/csv',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/gif',
    'image/tiff',
    'image/bmp',
    'image/avif',
    'image/heic',
    'image/heif',
  ]);

  create(file: MulterFile, request: Request) {
    if (
      !this.allowedMimeTypes.has(file.mimetype) &&
      !file.mimetype.startsWith('image/')
    ) {
      throw new BadRequestException(
        'Solo se permiten documentos e imágenes para este endpoint',
      );
    }

    ensureStorageDir(FILE_STORAGE_DIR);

    const extension = extname(file.originalname) || '.bin';
    const fileName = safeStoredName(file.originalname, extension);
    const filePath = join(FILE_STORAGE_DIR, fileName);

    writeFileSync(filePath, file.buffer);

    return {
      fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: statSync(filePath).size,
      url: buildPublicFileUrl(request, 'file', fileName),
      downloadUrl: buildPublicFileUrl(request, 'file', fileName),
    };
  }

  findAll(request: Request) {
    return listStoredFiles(
      request,
      FILE_STORAGE_DIR,
      'file',
      'application/octet-stream',
    );
  }

  async findOne(fileName: string): Promise<StreamableFile> {
    const safeFileName = normalizeStoredFileName(fileName);
    const filePath = join(FILE_STORAGE_DIR, safeFileName);

    if (!existsSync(filePath)) {
      throw new NotFoundException('El archivo no existe');
    }

    return new StreamableFile(createReadStream(filePath), {
      disposition: `attachment; filename="${safeFileName}"`,
    });
  }
}
