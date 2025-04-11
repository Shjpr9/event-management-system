import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { sendResponse } from '../response/responseHandler.js';
import { eventSchema } from '../validation/validations.js';
import { openEventsCount } from '../helpers/openEventsCount.js';

export async function createEvent(req: Request, res: Response) {
    const { name, description, location, startTime, endTime, capacity } =
        req.body;
    const user = req.body.user;
    const { error, value } = eventSchema.validate({
        name,
        description,
        location,
        startTime,
        endTime,
        capacity,
    });

    if (error) {
        sendResponse(
            res,
            false,
            'Validation error!',
            error.details.map(detail => detail.message)
        );
        return;
    }

    try {
        const count = await openEventsCount(user.id);
        if (count > 5 && !user.isAdmin) {
            sendResponse(
                res,
                false,
                'You have reached the maximum number of open events!'
            );
            return;
        }
        const event = await prisma.event.create({
            data: {
                ...value,
                userId: user.id,
            },
        });
        sendResponse(res, true, 'Event created successfully!', { event });
    } catch (error: any) {
        sendResponse(res, false, 'Error creating event!', error.message);
    }
}
