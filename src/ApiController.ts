import type { Request, Response } from 'express';
import { asyncHandler } from './utils/index.js';

const handleGet = async (req: Request, res: Response) => {
    
};

const handlePost = asyncHandler(async (req: Request, res: Response) => {
    const { params : { collection }, path } = req;
    const basePath = path.split('/')[1];

    switch (basePath) {
        case 'create': {
            
            return res.json({ message: `${collection} created!!`});
        }
    
        default:
            return res.json('switch case not found!')
    }
});


export { handleGet, handlePost };