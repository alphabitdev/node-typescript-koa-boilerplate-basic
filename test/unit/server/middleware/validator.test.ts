import { expect } from 'chai';
import * as Joi from 'joi';
import { describe, it } from 'mocha';
import { FieldValidationError } from '../../../../src/server/errors';
import validate from '../../../../src/server/middleware/validator';

describe('validate', () => {
  it('Should not throw an error when body valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx: any = {
      request: {
        body: { name: 'test' }
      }
    };

    const schema = { request: { body: { name: Joi.string().required() } } };

    const validateMiddleware = validate(schema);

    await validateMiddleware(ctx, () => Promise.resolve());
  });

  it('Should throw an error when body is not valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx: any = {
      request: {
        body: {}
      }
    };

    const schema = { request: { body: { name: Joi.string().required() } } };
    const validateMiddleware = validate(schema);

    try {
      await validateMiddleware(ctx, () => Promise.resolve());
      expect.fail('Should not reach this point');
    } catch (error) {
      expect(error).instanceof(FieldValidationError);
      expect(error.fields[0].message).equals('"name" is required');
    }
  });
});
