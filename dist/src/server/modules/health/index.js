"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controller_1 = __importDefault(require("./controller"));
exports.default = (server, healthMonitor) => {
    const controller = new controller_1.default(healthMonitor);
    const router = new koa_router_1.default();
    router.get('/health', controller.getHealth.bind(controller));
    server.use(router.routes());
};
//# sourceMappingURL=index.js.map