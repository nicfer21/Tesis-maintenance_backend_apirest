import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const requestTime = Date.now();

    console.log(
      `${new Date(requestTime).toISOString()} - ${req.ip} [${req.method}] ${req.originalUrl}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - requestTime;

      console.log(
        `${new Date(requestTime).toISOString()} - ${req.ip} [${statusCode}] ${responseTime} ms`,
      );
    });

    next();
  }
}
