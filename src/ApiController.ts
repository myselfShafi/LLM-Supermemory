import type { Request, Response } from "express";
import { HTTP_STATUS } from "./constants/httpCodes.constant.js";
import prisma from "./database/prisma.js";
import ApiError from "./utils/ApiError.util.js";
import ApiResponse from "./utils/ApiResponse.util.js";
import asyncHandler from "./utils/asyncHandler.util.js";

const handleGet = asyncHandler(async (req:Request, res: Response) => {
    
});

const DB_REGISTRY = {
    user: {  }
}

const handlePost = asyncHandler(async (req:Request, res: Response) => {
    const { params : { collection }, path, body } = req;
    const basePath = path.split('/')[2];
    if (!collection) throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid or missing collection name.');
    console.log({collection, basePath, body});
    
    switch (basePath) {
        case 'create': {
            const doc = await (prisma as any)[collection].create({ data: body.payload });
            console.log({doc});
            return new ApiResponse(HTTP_STATUS.OK, doc, `${collection} created!!`);
        }
    
        default:
            return res.json('switch case not found!')
    }
});


export { handleGet, handlePost };

