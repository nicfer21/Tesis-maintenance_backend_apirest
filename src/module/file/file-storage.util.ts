import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { randomUUID } from 'crypto';
import { basename, extname, join } from 'path';
import { BadRequestException } from '@nestjs/common';
import type { Request } from 'express';

export type StoredFileItem = {
  fileName: string;
  originalName: string;
  extension: string;
  size: number;
  mimeType: string;
  url: string;
  downloadUrl: string;
};

export const FILE_ROOT = join(process.cwd(), 'uploads');
export const IMAGE_STORAGE_DIR = join(FILE_ROOT, 'image');
export const FILE_STORAGE_DIR = join(FILE_ROOT, 'file');

export function ensureStorageDir(directory: string) {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
}

export function safeStoredName(originalName: string, extension?: string) {
  const cleanBaseName = basename(originalName)
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  const suffix = extension ?? extname(originalName);
  const normalizedExtension = suffix.startsWith('.')
    ? suffix
    : suffix
      ? `.${suffix}`
      : '';

  return `${cleanBaseName || 'file'}-${randomUUID()}${normalizedExtension}`;
}

export function buildPublicFileUrl(
  request: Request,
  route: string,
  fileName: string,
) {
  const baseUrl = `${request.protocol}://${request.get('host')}`;
  return new URL(
    `/api/${route}/${encodeURIComponent(fileName)}`,
    baseUrl,
  ).toString();
}

export function listStoredFiles(
  request: Request,
  directory: string,
  route: string,
  mimeType: string,
): StoredFileItem[] {
  ensureStorageDir(directory);

  return readdirSync(directory)
    .map((fileName) => {
      const filePath = join(directory, fileName);
      const fileStats = statSync(filePath);
      const extension = extname(fileName);

      return {
        fileName,
        originalName: fileName.replace(/-[0-9a-fA-F-]{36}(?=\.[^.]+$|$)/, ''),
        extension,
        size: fileStats.size,
        mimeType,
        url: buildPublicFileUrl(request, route, fileName),
        downloadUrl: buildPublicFileUrl(request, route, fileName),
      } satisfies StoredFileItem;
    })
    .sort((left, right) => left.fileName.localeCompare(right.fileName));
}

export function normalizeStoredFileName(fileName: string) {
  const safeFileName = basename(fileName);

  if (safeFileName !== fileName) {
    throw new BadRequestException('Invalid file name');
  }

  return safeFileName;
}
