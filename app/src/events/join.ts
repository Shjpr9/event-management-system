import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';
import { eventLogger } from '../helpers/eventLogger.js';

export async function joinEvent(req: Request, res: Response) {
    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
        });
        if (event.userId === req.body.user.id) {
            sendResponse(res, false, "You can't join your own event");
            return;
        }
        const eventRegistration = await prisma.eventRegistration.create({
            data: {
                userId: req.body.user.id,
                eventId: event.id,
            },
        });
        await eventLogger('join', event.id, req.body.user.id);
        sendResponse(res, true, 'Joined event successfully');
    } catch (error: any) {
        sendResponse(res, false, 'Error joining event', error.message);
    }
}
