import express from "express";
import {deleteBrand, getBrandByUserId, registerBrand, updateBrand} from "../controllers/brandController";

const router = express.Router();

router.route('/:id').get(getBrandByUserId)
router.route('/').post(registerBrand);
router.route('/delete/:id').delete(deleteBrand)
router.route('/update/:id').put(updateBrand)
export default router;