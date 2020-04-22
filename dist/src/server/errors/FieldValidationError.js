"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
class FieldValidationError extends AppError_1.default {
    constructor(message, fields, error) {
        super(30001, message, error);
        this.fields = fields;
    }
    toModel() {
        return {
            code: this.code,
            message: this.message,
            fields: this.fields
        };
    }
}
exports.default = FieldValidationError;
//# sourceMappingURL=FieldValidationError.js.map