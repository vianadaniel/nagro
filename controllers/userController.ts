import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import express from "express";
import generateToken from "../utils/generateToken";

const registerUser = asyncHandler(async (request: express.Request, response: express.Response) => {
    const {name, email, password} = request.body;
    const userExist = await User.findOne({email});
    if (!name || !email || !password ) {
        response.status(422)
        throw new Error("Missing input");
     }

     if (email.indexOf("@") === -1) {
        response.status(422)
        throw new Error("Invalid email");
     }

     if (password.length < 6) {
        response.status(422)
        throw new Error("Invalid password");
     }

    if (userExist) {
        response.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        response.status(400);
        throw new Error('Invalid user data');
    }
});


const authUser = asyncHandler(async (request: express.Request, response: express.Response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }

    response.status(401);
    throw new Error('Invalid email or password');
});


const getUserProfile = asyncHandler(async (request: express.Request, response: express.Response) => {
    const user = await User.findById(request.user?._id);

    if(user) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }

    response.status(404);
    throw new Error('User not found');
});


const updateUserProfile = asyncHandler(async (request: express.Request, response: express.Response) => {
    const user = await User.findById(request.user?._id);

    if(user) {
        user.email = request?.body?.email || user.email;
        user.name = request?.body?.name || user.name;
        if(request.body.password){
        if (request.body.password.length < 6) {
            response.status(422)
            throw new Error("Invalid password");
         }}

        if(request.body.password) {
            user.password = request.body.password;
        }

        const updatedUser = await user.save();

        return response.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    }

    response.status(404);
    throw new Error('User not found');
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
}