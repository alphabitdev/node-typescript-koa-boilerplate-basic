import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import pino from 'pino';
import * as sinon from 'sinon';
import { NotFoundError } from '../../../../src/server/errors';
import errorHandler from '../../../../src/server/middleware/error-handler';

describe('errorHandler', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('Should create an Internal Error Server when error is a unknown error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx: any = {};
    const logger = pino({ name: 'test', level: 'silent' });
    const spy = sinon.spy(logger, 'error');
    const errorHandlerMiddleware = errorHandler(logger);

    // eslint-disable-next-line prefer-promise-reject-errors
    await errorHandlerMiddleware(ctx, () => Promise.reject('Unknown error'));

    expect(spy.calledOnce).equals(true);
    expect(spy.args[0][1]).equals('Unknown error');
    expect(ctx.status).equals(500);
    expect(ctx.body).includes({
      code: 10000,
      message: 'Internal Error Server'
    });
  });

  it('Should handle the error when is a AppError', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx: any = {};
    const logger = pino({ name: 'test', level: 'silent' });
    const spy = sinon.spy(logger, 'error');
    const errorHandlerMiddleware = errorHandler(logger);

    await errorHandlerMiddleware(ctx, () => Promise.reject(new NotFoundError('Test Not Found')));

    expect(spy.calledOnce).equals(true);
    expect(spy.args[0][1]).instanceof(NotFoundError);
    expect(ctx.status).equals(404);
    expect(ctx.body).eql({
      code: 20000,
      message: 'Test Not Found'
    });
  });
});
