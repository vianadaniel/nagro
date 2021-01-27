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
exports.updateBrand = exports.deleteBrand = exports.registerBrand = exports.getBrandByUserId = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const brandModel_1 = __importDefault(require("../models/brandModel"));
const getBrandByUserId = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let query = { userId: request.params.id };
    const brand = yield brandModel_1.default.find(query);
    if (brand) {
        response.json(brand);
    }
    else {
        response.status(404);
        throw new Error('Product not found');
    }
}));
exports.getBrandByUserId = getBrandByUserId;
const registerBrand = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName, userId, cnpj, products } = request.body;
    const brandExist = yield brandModel_1.default.findOne({ brandName });
    if (!brandName || !userId || !cnpj || !products) {
        response.status(422);
        throw new Error("Missing input");
    }
    if (brandName.length > 100) {
        response.status(422);
        throw new Error("Invalid name");
    }
    if (cnpj > 99999999999999) {
        response.status(422);
        throw new Error("Invalid cnpj");
    }
    if (brandExist) {
        response.status(400);
        throw new Error('Brand already exists');
    }
    const brand = yield brandModel_1.default.create({
        brandName,
        userId,
        cnpj,
        products,
    });
    if (brand) {
        response.status(201).json({
            brandName: brand.brandName,
            userId: brand.userId,
            cnpj: brand.cnpj,
            products: brand.products
        });
    }
    else {
        response.status(400);
        throw new Error('Invalid brand data');
    }
}));
exports.registerBrand = registerBrand;
const deleteBrand = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brandModel_1.default.findById(request.params.id);
    if (brand) {
        yield brand.remove();
        response.json({ message: 'Brand removed' });
    }
    else {
        response.status(404);
        throw new Error('Brand not found');
    }
}));
exports.deleteBrand = deleteBrand;
const updateBrand = express_async_handler_1.default((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const brand = yield brandModel_1.default.findById(request.params.id);
    if (brand) {
        brand.brandName = ((_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.brandName) || brand.brandName;
        brand.cnpj = ((_b = request === null || request === void 0 ? void 0 : request.body) === null || _b === void 0 ? void 0 : _b.cnpj) || brand.cnpj;
        if (request.body.cnpj > 99999999999999) {
            response.status(422);
            throw new Error("Invalid cnpj");
        }
        const upBrand = yield brand.save();
        return response.json({
            brandName: upBrand.brandName,
            cnpj: upBrand.cnpj,
            products: upBrand.products
        });
    }
    response.status(404);
    throw new Error('User not found');
}));
exports.updateBrand = updateBrand;
