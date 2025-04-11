import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getEventLogs(req: Request, res: Response) {
    try {
        const user = req.body.user;
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            select: {
                userId: true,
                logs: true,
            },
        });
        if (event.userId !== user.id && !user.isAdmin) {
            sendResponse(res, false, 'You are not the owner of this event');
            return;
        }

        sendResponse(res, true, 'Got logs successfully', event.logs);
    } catch (error: any) {
        sendResponse(res, false, 'Cant get logs', error.message);
    }
}
