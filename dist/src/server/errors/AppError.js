"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message, error) {
        super(message);
        this.code = code;
        this.error = error;
    }
    toModel() {
        return {
            code: this.code,
            message: this.message
        };
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map