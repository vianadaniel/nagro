import mongoose from 'mongoose';

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/proshop';

    try{
        const connection = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);

        process.exit(1);
    }
};

export default connectDB;
