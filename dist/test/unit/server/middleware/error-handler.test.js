"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const pino_1 = __importDefault(require("pino"));
const sinon = __importStar(require("sinon"));
const errors_1 = require("../../../../src/server/errors");
const error_handler_1 = __importDefault(require("../../../../src/server/middleware/error-handler"));
mocha_1.describe('errorHandler', () => {
    const sandbox = sinon.createSandbox();
    mocha_1.afterEach(() => {
        sandbox.restore();
    });
    mocha_1.it('Should create an Internal Error Server when error is a unknown error', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {};
        const logger = pino_1.default({ name: 'test', level: 'silent' });
        const spy = sinon.spy(logger, 'error');
        const errorHandlerMiddleware = error_handler_1.default(logger);
        // eslint-disable-next-line prefer-promise-reject-errors
        await errorHandlerMiddleware(ctx, () => Promise.reject('Unknown error'));
        chai_1.expect(spy.calledOnce).equals(true);
        chai_1.expect(spy.args[0][1]).equals('Unknown error');
        chai_1.expect(ctx.status).equals(500);
        chai_1.expect(ctx.body).includes({
            code: 10000,
            message: 'Internal Error Server'
        });
    });
    mocha_1.it('Should handle the error when is a AppError', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {};
        const logger = pino_1.default({ name: 'test', level: 'silent' });
        const spy = sinon.spy(logger, 'error');
        const errorHandlerMiddleware = error_handler_1.default(logger);
        await errorHandlerMiddleware(ctx, () => Promise.reject(new errors_1.NotFoundError('Test Not Found')));
        chai_1.expect(spy.calledOnce).equals(true);
        chai_1.expect(spy.args[0][1]).instanceof(errors_1.NotFoundError);
        chai_1.expect(ctx.status).equals(404);
        chai_1.expect(ctx.body).eql({
            code: 20000,
            message: 'Test Not Found'
        });
    });
});
//# sourceMappingURL=error-handler.test.js.map