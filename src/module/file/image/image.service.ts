import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, existsSync, statSync } from 'fs';
import { join } from 'path';
import type { Request } from 'express';
import type { File as MulterFile } from 'multer';
import sharp from 'sharp';
import {
  IMAGE_STORAGE_DIR,
  buildPublicFileUrl,
  ensureStorageDir,
  listStoredFiles,
  normalizeStoredFileName,
  safeStoredName,
} from '../file-storage.util';

@Injectable()
export class ImageService {
  private readonly allowedMimeTypes = new Set([
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

  async create(files: MulterFile[], request: Request) {
    if (files.length > 5) {
      throw new BadRequestException(
        'Solo se pueden subir hasta 5 imágenes por solicitud',
      );
    }

    ensureStorageDir(IMAGE_STORAGE_DIR);

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (
          !this.allowedMimeTypes.has(file.mimetype) &&
          !file.mimetype.startsWith('image/')
        ) {
          throw new BadRequestException(
            `El archivo ${file.originalname} no es una imagen permitida`,
          );
        }

        const fileName = safeStoredName(file.originalname, '.webp');
        const filePath = join(IMAGE_STORAGE_DIR, fileName);

        await sharp(file.buffer)
          .rotate()
          .webp({ quality: 95 })
          .toFile(filePath);

        return {
          fileName,
          originalName: file.originalname,
          mimeType: 'image/webp',
          size: existsSync(filePath) ? statSync(filePath).size : 0,
          url: buildPublicFileUrl(request, 'image', fileName),
          downloadUrl: buildPublicFileUrl(request, 'image', fileName),
        };
      }),
    );

    return {
      count: uploadedFiles.length,
      files: uploadedFiles,
    };
  }

  findAll(request: Request) {
    return listStoredFiles(request, IMAGE_STORAGE_DIR, 'image', 'image/webp');
  }

  async findOne(fileName: string): Promise<StreamableFile> {
    const safeFileName = normalizeStoredFileName(fileName);
    const filePath = join(IMAGE_STORAGE_DIR, safeFileName);

    if (!existsSync(filePath)) {
      throw new NotFoundException('La imagen no existe');
    }

    return new StreamableFile(createReadStream(filePath), {
      type: 'image/webp',
      disposition: `inline; filename="${safeFileName}"`,
    });
  }
}
