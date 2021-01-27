import mongoose from 'mongoose';

        

const serviceBrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
    
}, {
    timestamps: true,
});

export default serviceBrandSchema;