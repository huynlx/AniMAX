"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const memory_cache_1 = __importDefault(require("memory-cache"));
const DEFAULT_DURATION = 1800; // 30 minutes
const cache = (duration = DEFAULT_DURATION) => {
    return (req, res, next) => {
        let key = "__express__" + req.originalUrl || req.url;
        let cachedBody = memory_cache_1.default.get(key);
        if (cachedBody)
            return res.send(cachedBody);
        res.sendResponse = res.send;
        res.send = (body) => {
            memory_cache_1.default.put(key, body, duration * 1000);
            res.sendResponse(body);
        };
        next();
    };
};
exports.default = cache;
