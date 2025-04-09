import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    const userId = req.body.user.id;

    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: eventId,
            },
        });
        if (event.userId !== userId) {
            sendResponse(
                res,
                false,
                'You are not authorized to update this event!'
            );
            return;
        }
        const {
            name,
            description,
            location,
            startTime,
            endTime,
            capacity,
            status,
        } = req.body;

        const updated = await prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                name,
                description,
                location,
                startTime,
                endTime,
                capacity: capacity ? parseInt(capacity) : undefined,
                status,
            },
        });
        sendResponse(res, true, 'Event updated successfully!', {
            event: updated,
        });
    } catch (error: any) {
        sendResponse(res, false, 'Cant update event!', error.message);
    }
}
