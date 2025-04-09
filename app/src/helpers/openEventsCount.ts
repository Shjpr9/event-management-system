import { prisma } from '../client.js';

export async function openEventsCount(userId: string): Promise<number> {
    const events = await prisma.event.count({
        where: {
            status: 'open',
            userId: userId,
        },
    });
    return events ?? 0;
}
