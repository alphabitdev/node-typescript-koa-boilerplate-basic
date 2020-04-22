"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class HealthMonitor {
    constructor() {
        this.isShuttingDown = false;
        this.startTime = Date.now();
    }
    shuttingDown() {
        this.isShuttingDown = true;
    }
    getStatus() {
        return {
            startTime: new Date(this.startTime).toISOString(),
            upTime: moment_1.default(this.startTime).fromNow(true),
            isShuttingDown: this.isShuttingDown
        };
    }
}
exports.default = HealthMonitor;
//# sourceMappingURL=HealthMonitor.js.map