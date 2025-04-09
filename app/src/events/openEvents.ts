import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getOpenEvents(req: Request, res: Response) {
    try {
        const events = await prisma.event.findMany({
            where: {
                status: 'open',
            },
            select: {
                id: true,
                userId: true,
                name: true,
                description: true,
            },
        });
        if (events.length === 0) {
            sendResponse(res, false, 'No open events found!');
            return;
        }
        sendResponse(res, true, 'Open events retrieved successfully!', {
            events,
        });
    } catch (error: any) {
        sendResponse(
            res,
            false,
            'Error retrieving open events!',
            error.message
        );
    }
}
