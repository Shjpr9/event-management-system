import { Request, Response } from 'express';
import { sendResponse } from '../response/responseHandler.js';
import { UserInterface } from '../interfaces/UserInterface.js';

export async function getUser(req: Request, res: Response) {
    const user: UserInterface = {
        id: req.body.user.id,
        name: req.body.user.name,
        email: req.body.user.email,
        isAdmin: req.body.user.isAdmin,
        createdAt: req.body.user.createdAt,
        updatedAt: req.body.user.updatedAt,
    };
    sendResponse(res, true, 'Got user successfully!', { user });
}
