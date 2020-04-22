"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Joi = __importStar(require("joi"));
const mocha_1 = require("mocha");
const errors_1 = require("../../../../src/server/errors");
const validator_1 = __importDefault(require("../../../../src/server/middleware/validator"));
mocha_1.describe('validate', () => {
    mocha_1.it('Should not throw an error when body valid', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {
            request: {
                body: { name: 'test' }
            }
        };
        const schema = { request: { body: { name: Joi.string().required() } } };
        const validateMiddleware = validator_1.default(schema);
        await validateMiddleware(ctx, () => Promise.resolve());
    });
    mocha_1.it('Should throw an error when body is not valid', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {
            request: {
                body: {}
            }
        };
        const schema = { request: { body: { name: Joi.string().required() } } };
        const validateMiddleware = validator_1.default(schema);
        try {
            await validateMiddleware(ctx, () => Promise.resolve());
            chai_1.expect.fail('Should not reach this point');
        }
        catch (error) {
            chai_1.expect(error).instanceof(errors_1.FieldValidationError);
            chai_1.expect(error.fields[0].message).equals('"name" is required');
        }
    });
});
//# sourceMappingURL=validator.test.js.map