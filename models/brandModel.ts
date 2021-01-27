import mongoose, {Document} from "mongoose";
import productBrandSchema from './productBrandModel'
const brandSchema = new mongoose.Schema({
    brandName:{
        type: String,
        required: true,
    },
    cnpj: {type: Number, required: true},
    userId: {
        type: String,
        required: true,
        
    },
    products: [productBrandSchema],
});
export interface BrandInterface {
    brandName: string
    cnpj: number
    userId: string
    products: []
}
export interface BrandDocument extends BrandInterface, Document {
    
       
}

const Brand = mongoose.model<BrandDocument>('Brand', brandSchema);

export default Brand;