import dotenv from 'dotenv';
import connectDB from './config/db';
import User from "./models/userModel";
import users from "./data/users";
import brand from "./data/brand"
import Brand from './models/brandModel';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        
        await User.deleteMany();
        await Brand.deleteMany();
        await User.insertMany(users);
        await Brand.insertMany(brand)
        
        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        
        await Brand.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
