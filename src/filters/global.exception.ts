import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { writeFile } from 'fs';
import { join } from 'path';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };
    // this.writeHttpLog(body);
    response.status(status).json(body);
  }
  async writeHttpLog(body: Record<string, any>) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);
    try {
      writeFile(LOGS_DIR, JSON.stringify(body), (err) => {
        if (err) {
          console.error(err);
        }
        console.log('log created suceffuly ');
      });
    } catch (error) {
      return;
    }
  }
}
