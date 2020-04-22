"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const HealthMonitor_1 = __importDefault(require("../../../../src/server/lib/HealthMonitor"));
mocha_1.describe('HealthMonitor', () => {
    mocha_1.describe('getStatus', () => {
        mocha_1.it('Should return isShuttingDown true', async () => {
            const health = new HealthMonitor_1.default();
            let status = health.getStatus();
            chai_1.expect(status.isShuttingDown).equals(false);
            health.shuttingDown();
            status = health.getStatus();
            chai_1.expect(status.isShuttingDown).equals(true);
        });
    });
});
//# sourceMappingURL=health.test.js.map