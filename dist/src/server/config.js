"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    corsConfig: {
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
    },
    bodyParser: {
        enableTypes: ['json'],
        jsonLimit: '10mb'
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map