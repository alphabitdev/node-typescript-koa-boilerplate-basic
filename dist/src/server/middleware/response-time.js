"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx, next) => {
    const start = Date.now();
    await next();
    ctx.set('X-Response-Time', (Date.now() - start).toString());
};
//# sourceMappingURL=response-time.js.map