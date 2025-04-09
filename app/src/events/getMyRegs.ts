import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getMyRegistrations(req: Request, res: Response) {
    try {
        const registrations = await prisma.eventRegistration.findMany({
            where: {
                userId: req.body.user.id,
            },
            include: {
                event: true,
            },
        });
        sendResponse(res, true, 'Registrations retrieved successfully!', { registrations });
    } catch (error: any) {
        sendResponse(res, false, 'Error retrieving registrations!', error.message);
    }
}