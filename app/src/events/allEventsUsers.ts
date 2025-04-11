import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';
import { openEventsCount } from '../helpers/openEventsCount.js';

export async function getAllUsersEvents(req: Request, res: Response) {
    const user = req.body.user;
    if (!user.isAdmin) {
        sendResponse(res, false, 'You are not an admin!');
        return;
    }
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        const usersWithEvents = await Promise.all(users.map(async (user: any) => {
            const count = await openEventsCount(user.id);
            return { ...user, openEvents: count };
        }));
        sendResponse(res, true, 'Users retrieved successfully!', { usersWithEvents });

    } catch (error: any) {
        sendResponse(res, false, 'Cant get users', error.message);
    }
}