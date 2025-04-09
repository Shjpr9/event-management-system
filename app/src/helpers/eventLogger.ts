import { prisma } from '../client.js';

export async function eventLogger(
    action: string,
    eventId: string,
    userId: string
) {
    if (!action || !eventId || !userId) {
        throw new Error('Missing required parameters for logging');
    }

    if (action == 'join' || action == 'leave') {
        const log = await prisma.eventLog.create({
            data: {
                action,
                eventId,
                userId,
            },
        });
    } else {
        throw new Error('Invalid action');
    }
}
