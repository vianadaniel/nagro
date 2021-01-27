"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const router = express_1.default.Router();
router.route('/:id').get(brandController_1.getBrandByUserId);
router.route('/').post(brandController_1.registerBrand);
router.route('/delete/:id').delete(brandController_1.deleteBrand);
router.route('/update/:id').put(brandController_1.updateBrand);
exports.default = router;
