import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;

    // Si es una HttpException de Nest (excepciones ya creadas)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message || message;
      details = (errorResponse as any).details || null;
    }

    // Manejo opcional de errores nativos
    else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unhandled error: ${exception.stack}`);
    }

    // Log para depuración
    this.logger.error(
      `${request.method} ${request.url} - ${status} ${message}`,
    );

    // Respuesta estandarizada
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(details && { details }),
      // En producción NO mostrar stack
      ...(process.env.NODE_ENV !== 'production' &&
        exception instanceof Error && { stack: exception.stack }),
    });
  }
}
