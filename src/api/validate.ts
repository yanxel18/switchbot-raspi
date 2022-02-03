import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../utils/key';
export async function TokenValidate(req: Request, res: Response, next: NextFunction) {
    try {
        const userToken = req.headers.authorization;
        if (userToken) {
            const tokensplit = userToken?.split(' ')[1]; 
                jwt.verify(tokensplit.toString(), accessTokenSecret, (err) => {
                    if (err) { 
                        res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
                    } else {
                        next();
                    }
                }); 
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
        }

    } catch (err: any) {
        res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
    }
}