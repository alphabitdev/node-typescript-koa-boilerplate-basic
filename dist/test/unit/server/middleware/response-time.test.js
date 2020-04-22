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
const sinon = __importStar(require("sinon"));
const mocha_1 = require("mocha");
const response_time_1 = __importDefault(require("../../../../src/server/middleware/response-time"));
mocha_1.describe('responseTime', () => {
    const sandbox = sinon.createSandbox();
    mocha_1.afterEach(() => {
        sandbox.restore();
    });
    mocha_1.it('Should set header x-response-time', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            set: () => { }
        };
        const spy = sinon.spy(ctx, 'set');
        await response_time_1.default(ctx, () => Promise.resolve());
        chai_1.expect(spy.calledOnce).equals(true);
        chai_1.expect(spy.args[0][0]).equals('X-Response-Time');
    });
});
//# sourceMappingURL=response-time.test.js.map