"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const mocha_1 = require("mocha");
const server_utils_1 = require("../server-utils");
mocha_1.describe('GET /health', () => {
    mocha_1.after(async () => {
        server_utils_1.end();
    });
    const app = supertest_1.default(server_utils_1.testServer);
    mocha_1.it('Should return 200 when server is running healthy', async () => {
        const res = await app.get('/health').expect(200);
        chai_1.expect(res.body.isShuttingDown).equals(false);
    });
    mocha_1.it('Should return 503 when server is shutting down', async () => {
        server_utils_1.shuttingDown();
        const res = await app.get('/health').expect(503);
        chai_1.expect(res.body.isShuttingDown).equals(true);
    });
});
//# sourceMappingURL=health-check.test.js.map