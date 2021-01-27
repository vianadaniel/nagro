"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = express_async_handler_1.default((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authHeader = request.headers.authorization;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        response.status(500);
        throw new Error('JWT Secret has not been assigned');
    }
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            request.user = yield userModel_1.default.findById(decoded.id).select('-password');
        }
        catch (error) {
            console.error({ error });
            response.status(401);
            throw new Error('Not Authorized, invalid token');
        }
    }
    if (!token) {
        response.status(401);
        throw new Error('Not Authorized, no token provided');
    }
    next();
}));
exports.protect = protect;
