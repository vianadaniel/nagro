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
exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = request.body;
    const userExist = yield userModel_1.default.findOne({ email });
    if (!name || !email || !password) {
        response.status(422);
        throw new Error("Missing input");
    }
    if (email.indexOf("@") === -1) {
        response.status(422);
        throw new Error("Invalid email");
    }
    if (password.length < 6) {
        response.status(422);
        throw new Error("Invalid password");
    }
    if (userExist) {
        response.status(400);
        throw new Error('User already exists');
    }
    const user = yield userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken_1.default(user._id),
        });
    }
    else {
        response.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.registerUser = registerUser;
const authUser = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password, user.password))) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken_1.default(user._id),
        });
    }
    response.status(401);
    throw new Error('Invalid email or password');
}));
exports.authUser = authUser;
const getUserProfile = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield userModel_1.default.findById((_a = request.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    response.status(404);
    throw new Error('User not found');
}));
exports.getUserProfile = getUserProfile;
const updateUserProfile = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const user = yield userModel_1.default.findById((_b = request.user) === null || _b === void 0 ? void 0 : _b._id);
    if (user) {
        user.email = ((_c = request === null || request === void 0 ? void 0 : request.body) === null || _c === void 0 ? void 0 : _c.email) || user.email;
        user.name = ((_d = request === null || request === void 0 ? void 0 : request.body) === null || _d === void 0 ? void 0 : _d.name) || user.name;
        if (request.body.password) {
            if (request.body.password.length < 6) {
                response.status(422);
                throw new Error("Invalid password");
            }
        }
        if (request.body.password) {
            user.password = request.body.password;
        }
        const updatedUser = yield user.save();
        return response.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken_1.default(updatedUser._id),
        });
    }
    response.status(404);
    throw new Error('User not found');
}));
exports.updateUserProfile = updateUserProfile;
