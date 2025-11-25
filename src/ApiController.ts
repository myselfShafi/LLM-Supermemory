import type { Request, Response } from "express";

const handleGet = async (req:Request, res: Response) => {
    
};

const handlePost = async (req:Request, res: Response) => {
    const { params : { collection }, path } = req;
    const basePath = path.split('/')[1];

    switch (basePath) {
        case 'create': {
            // const doc = await prisma.user.create({});
            return res.json({ message: `${collection} created!!`});
        }
    
        default:
            return res.json('switch case not found!')
    }
};


export { handleGet, handlePost };

