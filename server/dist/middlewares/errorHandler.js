"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestError_1 = __importDefault(require("../errors/requestError"));
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    if (err instanceof requestError_1.default) {
        return res.json({
            success: false,
            error: err.message,
            message: err.userMessage,
        });
    }
    return res.json({
        success: false,
        error: err.message,
        message: `Lỗi server [${err.message}]`,
    });
};
exports.default = errorHandler;
