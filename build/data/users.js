"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: "Admin User",
        email: "admin@lbn.com",
        password: bcryptjs_1.default.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Daniel Viana",
        email: "dan@lbn.com",
        password: bcryptjs_1.default.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "João",
        email: "jo@lbn.com",
        password: bcryptjs_1.default.hashSync("123456", 10),
        isAdmin: false,
    }
];
exports.default = users;
