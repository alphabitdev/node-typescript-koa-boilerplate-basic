"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (logger) => {
    return async (ctx, next) => {
        const start = Date.now();
        await next();
        const message = `[${ctx.status}] ${ctx.method} ${ctx.path}`;
        const logData = {
            method: ctx.method,
            path: ctx.path,
            statusCode: ctx.status,
            timeMs: Date.now() - start
        };
        if (ctx.status >= 400) {
            logger.error(message, logData, ctx.body);
        }
        else {
            logger.info(message, logData);
        }
    };
};
//# sourceMappingURL=log-request.js.map