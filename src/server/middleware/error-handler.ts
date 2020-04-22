import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import { Logger } from 'pino';
import { AppError } from '../errors';

const httpCodes: { [key: string]: number } = {
  10000: 500,
  20000: 404,
  30000: 400,
  30001: 400,
  30002: 401,
  30003: 403
};

export default (logger: Logger): IMiddleware => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      logger.error('Error Handler:', err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = httpCodes[err.code.toString()] ? httpCodes[err.code.toString()] : 500;
      } else {
        ctx.body = new AppError(10000, 'Internal Error Server');
        ctx.status = 500;
      }
    }
  };
};
