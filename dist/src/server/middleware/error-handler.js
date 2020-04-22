"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const httpCodes = {
    10000: 500,
    20000: 404,
    30000: 400,
    30001: 400,
    30002: 401,
    30003: 403
};
exports.default = (logger) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (ctx, next) => {
        try {
            await next();
        }
        catch (err) {
            logger.error('Error Handler:', err);
            if (err instanceof errors_1.AppError) {
                ctx.body = err.toModel();
                ctx.status = httpCodes[err.code.toString()] ? httpCodes[err.code.toString()] : 500;
            }
            else {
                ctx.body = new errors_1.AppError(10000, 'Internal Error Server');
                ctx.status = 500;
            }
        }
    };
};
//# sourceMappingURL=error-handler.js.map