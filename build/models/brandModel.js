"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productBrandModel_1 = __importDefault(require("./productBrandModel"));
const brandSchema = new mongoose_1.default.Schema({
    brandName: {
        type: String,
        required: true,
    },
    cnpj: { type: Number, required: true },
    userId: {
        type: String,
        required: true,
    },
    products: [productBrandModel_1.default],
});
const Brand = mongoose_1.default.model('Brand', brandSchema);
exports.default = Brand;
