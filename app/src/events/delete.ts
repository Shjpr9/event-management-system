import e, { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function deleteEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    const userId = req.body.user.id;

    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: eventId,
            },
            include: {
                registrations: true,
            },
        });
        if (event.userId !== userId) {
            sendResponse(
                res,
                false,
                'You are not authorized to delete this event!'
            );
            return;
        }
        if (event.registrations.length > 0) {
            sendResponse(
                res,
                false,
                'You cant delete event with registrations!'
            );
            return;
        }
        await prisma.event.delete({
            where: {
                id: eventId,
            },
        });

        sendResponse(res, true, 'Event deleted successfully!');
    } catch (error: any) {
        sendResponse(res, false, 'Cant delete event!', error.message);
    }
}
