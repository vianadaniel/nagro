import mongoose from 'mongoose';
import serviceBrandSchema from './serviceBrandModel'
        

const productBrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    service:[serviceBrandSchema]
    
}, {
    timestamps: true,
});

export default productBrandSchema;