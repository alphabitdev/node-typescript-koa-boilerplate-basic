"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const KoaServer_1 = __importDefault(require("../../src/server/KoaServer"));
const logger = pino_1.default({ name: 'test', level: 'silent' });
const port = Number(process.env.PORT) || 8080;
const koaServer = new KoaServer_1.default(logger);
koaServer.init();
exports.testServer = koaServer.listen(port);
function shuttingDown() {
    koaServer.getHealthMonitor().shuttingDown();
}
exports.shuttingDown = shuttingDown;
function end() {
    return koaServer.closeServer();
}
exports.end = end;
//# sourceMappingURL=server-utils.js.map