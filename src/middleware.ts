import { NextFunction, Request, Response } from 'express';
import config from './config';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import AppError from '@/lib/errors';

export default class GeneralMiddleware {
  static ErrorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) return;

    if ('getType' in err) {
      return res.status(err.statusCode || 500).json({
        state: 'error',
        type: err.name,
        timestamp: Date.now(),
        ...((err as any).errors ? { errors: (err as any).errors } : { message: err.message }),
        ...(config.app.env !== 'production' ? { stack: err.stack } : {}),
      });
    }

    return res.status(500).json({
      state: 'error',
      type: 'InternalServerError',
      timestamp: Date.now(),
      message: 'Something went wrong | Contact support',
      ...(config.app.env !== 'production' ? { stack: err.stack } : {}),
    });
  }

  static NotFoundHandler(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
      state: 'error',
      type: 'NotFoundError',
      message: 'endpoint not found',
      timestamp: Date.now(),
    });
  }

  static DevLogs(req: Request, res: Response, next: NextFunction) {
    console.log(`- requesting ${req.method} - ${req.url}`);
    console.log(
      `- request-data => body=${JSON.stringify(req.body)}; query=${JSON.stringify(req.query)}`
    );
    next();
  }

  static CORS = cors();
  static RateLimiting = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
