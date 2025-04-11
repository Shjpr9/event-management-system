import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';
import { openEventsCount } from '../helpers/openEventsCount.js';

export async function deleteUser(req: Request, res: Response) {
    const user = req.body.user;
    if (!user.isAdmin) {
        sendResponse(res, false, 'You are not an admin!');
        return;
    }
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        sendResponse(res, true, 'User deleted successfully!');

    } catch (error: any) {
        sendResponse(res, false, 'Cant delete user!', error.message);
    }
}