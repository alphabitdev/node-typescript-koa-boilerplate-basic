"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const KoaServer_1 = __importDefault(require("./server/KoaServer"));
// eslint-disable-next-line import/prefer-default-export
async function init() {
    const logger = pino_1.default();
    try {
        // Starting the HTTP server
        logger.info('Starting HTTP KOA server');
        const port = Number(process.env.PORT) || 8080;
        const koaServer = new KoaServer_1.default(logger);
        koaServer.init();
        koaServer.listen(port);
        logger.info(`Application running on port: ${port}`);
    }
    catch (e) {
        logger.error(e, 'An error occurred while initializing koa server.');
    }
}
exports.init = init;
init();
//# sourceMappingURL=index.js.map