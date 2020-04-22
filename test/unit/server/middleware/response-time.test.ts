import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe, it, afterEach } from 'mocha';
import responseTime from '../../../../src/server/middleware/response-time';

describe('responseTime', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('Should set header x-response-time', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx: any = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      set: () => {}
    };

    const spy = sinon.spy(ctx, 'set');

    await responseTime(ctx, () => Promise.resolve());

    expect(spy.calledOnce).equals(true);
    expect(spy.args[0][0]).equals('X-Response-Time');
  });
});
