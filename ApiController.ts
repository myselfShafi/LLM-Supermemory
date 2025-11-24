import { Request, Response } from "express";


const handleGet = async (req:Request, res: Response) => {
    
};

const handlePost = async (req:Request, res: Response) => {
    const { params : { collection }, path } = req;
    const basePath : String = path.split('/')[1];

    switch (basePath) {
        case 'create': {
            return res.json({ message: `${collection} created!!`});
        }
    
        default:
            return res.json('switch case not found!')
    }
};


export { handleGet, handlePost };

