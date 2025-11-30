import type { Request, Response } from "express";
import prisma from "./database/prisma.js";
import asyncHandler from "./utils/asyncHandler.util.js";

const handleGet = asyncHandler(async (req:Request, res: Response) => {
    
});

const DB_REGISTRY = {
    user: {  }
}

const handlePost = asyncHandler(async (req:Request, res: Response) => {
    const { params : { collection }, path, body } = req;
    const basePath = path.split('/')[2];

    switch (basePath) {
        case 'create': {
            const doc = await prisma[collection].create({data: body.payload});
            return res.json({ message: `${collection} created!!`});
        }
    
        default:
            return res.json('switch case not found!')
    }
});


export { handleGet, handlePost };

