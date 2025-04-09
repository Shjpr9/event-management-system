import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';

export async function getEventLogs(req: Request, res: Response) {
    try {
        const logs = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            select: {
                logs: true,
            }
        });

        sendResponse(res, true, "Got logs successfully", { logs });
    } catch (error: any) {
        sendResponse(res, false, "Cant get logs", error.message);
    }
}