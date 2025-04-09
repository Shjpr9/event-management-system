import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getSingleEvent(req: Request, res: Response) {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: req.params.id,
            },
            select: {
                id: true,
                userId: true,
                name: true,
                description: true,
                location: true,
                startTime: true,
                endTime: true,
                capacity: true,
                status: true,
            },
        });
        sendResponse(res, true, 'Event retrieved successfully!', { event });
    } catch (error: any) {
        sendResponse(res, false, 'Error retrieving event!', error.message);
    }
}
