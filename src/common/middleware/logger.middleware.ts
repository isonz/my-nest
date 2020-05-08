import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('LoggerMiddleware Request...');
    next();
  }
}

export function loggerMiddleware(req, res, next) {
  console.log('function Middleware logger Request...');
  next();
}
