import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getEventMembers(req: Request, res: Response) {
    const user = req.body.user;
    const eventId = req.params.id;

    try {
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            },
            include: {
                registrations: true,
            },
        });
        if (!event) {
            sendResponse(res, false, 'Event not found');
            return;
        }
        if (event.userId !== user.id && !user.isAdmin) {
            sendResponse(res, false, 'You are not authorized to view this event members');
            return;
        }
        sendResponse(res, true, 'Got event members successfully', event.registrations);
    } catch (error: any) {
        sendResponse(res, false, 'Something went wrong', error.message);
    }

}