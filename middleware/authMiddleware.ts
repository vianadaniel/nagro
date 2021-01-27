import User, {UserDocument} from "../models/userModel";
import asyncHandler from "express-async-handler";
import express from "express";
import jwt from 'jsonwebtoken';


declare global {
    namespace Express {
        interface Request {
            user: UserDocument | null
        }
    }
}

const protect = asyncHandler(async (request: express.Request, response: express.Response, next: any) => {
    let token;
    const authHeader = request.headers.authorization;
    
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        response.status(500);
        throw new Error('JWT Secret has not been assigned');
    }

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            const decoded: any = jwt.verify(token, secret);

            request.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            console.error({error});
            response.status(401);
            throw new Error('Not Authorized, invalid token');
        }
    }

    if (!token) {
        response.status(401);
        throw new Error('Not Authorized, no token provided');
    }

    next();
});

export {
    protect,
}