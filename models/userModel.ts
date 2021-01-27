import bcrypt from "bcryptjs";
import mongoose, {Document} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        default: false,
        required: true,
        type: Boolean,
    },
}, {
    timestamps: true,
});

export interface UserInterface {
    name: string
    email: string
    password: string
    isAdmin?: boolean
}

export interface UserDocument extends UserInterface, Document {
    matchPassword(enteredPassword: string): boolean
       
}

// Utilizar compareSync próxima vez

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (this: UserDocument, next: any) {
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
