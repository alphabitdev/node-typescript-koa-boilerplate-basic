"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const errors_1 = require("../errors");
exports.default = (schema) => {
    return async (ctx, next) => {
        const valResult = Joi.validate(ctx, schema, {
            allowUnknown: true,
            abortEarly: false
        });
        if (valResult.error) {
            throw new errors_1.FieldValidationError(valResult.error.message, valResult.error.details.map(f => ({
                message: f.message,
                path: f.path,
                type: f.type
            })), valResult.error);
        }
        await next();
    };
};
//# sourceMappingURL=validator.js.map