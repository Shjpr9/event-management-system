import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';
import { eventLogger } from '../helpers/eventLogger.js';


export async function leaveEvent(req: Request, res: Response) {
    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.params.id
            }
        });
        if (event.userId == req.body.userId) {
            sendResponse(res, false, "You cant leave your own event");
            return;
        }
        const registeration = await prisma.eventRegistration.findFirstOrThrow({
            where: {
                userId: req.body.user.id,
                eventId: event.id
            }
        });
        await prisma.eventRegistration.delete({
            where: {
                id: registeration.id
            }
        });
        await eventLogger("leave", event.id, req.body.user.id);
        sendResponse(res, true, "Left event successfully");
    } catch (error: any) {
        sendResponse(res, false, "Error leaving event", error.message);
    }
}