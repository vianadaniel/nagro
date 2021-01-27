"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serviceBrandModel_1 = __importDefault(require("./serviceBrandModel"));
const productBrandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    service: [serviceBrandModel_1.default]
}, {
    timestamps: true,
});
exports.default = productBrandSchema;
