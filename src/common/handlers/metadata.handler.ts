import type { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export function getMetadataFromRequest(req: Request) {
  const parser = new UAParser(req.headers['user-agent']);
  const deviceInfo = parser.getResult();
  const metadata = {
    ip: getIpFromRequest(req),
    data: deviceInfo,
  };

  return metadata;
}

export function getIpFromRequest(req: Request): string {
  const ip = req.ip;
  if (!ip) {
    return '';
  }

  return ip;
}
