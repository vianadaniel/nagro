import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    const secret = process.env.JWT_SECRET;

    if(secret) {
        return jwt.sign({id}, secret, {
            expiresIn: '30d',
        });
    }

    throw new Error('JWT Secret has not been assigned');
};

export default generateToken;
