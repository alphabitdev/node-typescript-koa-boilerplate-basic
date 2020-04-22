import { Context } from 'koa';

export default async (ctx: Context, next: () => Promise<unknown>) => {
  const start = Date.now();

  await next();

  ctx.set('X-Response-Time', (Date.now() - start).toString());
};
