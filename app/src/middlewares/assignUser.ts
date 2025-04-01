import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../response/responseHandler.js";
import { prisma } from "../client.js";
import jwt from 'jsonwebtoken';

export async function assignUser(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        sendResponse(res, false, 'Unauthorized!');
        return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        sendResponse(res, false, 'JWT secret not found!');
        return;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtSecret);
        const user = await prisma.user.findFirst({
            where: {
                id: (decoded as any).user_id
            }
        });
        req.body.user = user;
        next();
    } catch (error: any) {
        sendResponse(res, false, 'Invalid token!', error.message);
    }
}