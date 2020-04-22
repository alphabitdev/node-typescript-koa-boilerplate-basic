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
const pino_1 = __importDefault(require("pino"));
const sinon = __importStar(require("sinon"));
const mocha_1 = require("mocha");
const log_request_1 = __importDefault(require("../../../../src/server/middleware/log-request"));
mocha_1.describe('logRequest', () => {
    const sandbox = sinon.createSandbox();
    mocha_1.afterEach(() => {
        sandbox.restore();
    });
    mocha_1.it('Should log info level when no errors', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {};
        const logger = pino_1.default({ name: 'test', level: 'silent' });
        const spy = sinon.spy(logger, 'info');
        const logMiddleware = log_request_1.default(logger);
        await logMiddleware(ctx, () => Promise.resolve());
        chai_1.expect(spy.calledOnce).equals(true);
        chai_1.expect(spy.args[0].length).equals(2);
    });
    mocha_1.it('Should log error level when status code is >= 400', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = { status: 500 };
        const logger = pino_1.default({ name: 'test', level: 'silent' });
        const spy = sinon.spy(logger, 'error');
        const logMiddleware = log_request_1.default(logger);
        await logMiddleware(ctx, () => Promise.resolve());
        chai_1.expect(spy.calledOnce).equals(true);
        chai_1.expect(spy.args[0].length).equals(3);
    });
});
//# sourceMappingURL=log-request.test.js.map