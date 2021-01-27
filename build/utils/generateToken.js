"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (secret) {
        return jsonwebtoken_1.default.sign({ id }, secret, {
            expiresIn: '30d',
        });
    }
    throw new Error('JWT Secret has not been assigned');
};
exports.default = generateToken;
