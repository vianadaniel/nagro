import express from 'express';

const notFound = (request: express.Request, response: express.Response, next: any) => {
    const error = new Error(`Not found - ${request.originalUrl}`);

    response.status(404);
    next(error);
};

const errorHandler = (error: any, request: express.Request, response: express.Response, next: any) => {
    const statusCode = response.statusCode === 200 ? 500 : response.statusCode;

    response.status(statusCode);
    response.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};

export {
    notFound,
    errorHandler,
};
