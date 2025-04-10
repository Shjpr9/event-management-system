import 'dotenv/config';
import { prisma } from '../client.js';

export async function createSuperUser() {
    const { SUPERUSER_EMAIL, SUPERUSER_PASSWORD } = process.env;
    if (!SUPERUSER_EMAIL || !SUPERUSER_PASSWORD) {
        throw new Error(
            'Superuser credentials not provided in environment variables.'
        );
    }
    const su = await prisma.user.findFirst({
        where: {
            email: SUPERUSER_EMAIL,
        },
    });
    if (su) {
        console.log('Superuser already exists.');
        return;
    } else {
        await prisma.user.create({
            data: {
                name: 'Superuser',
                email: SUPERUSER_EMAIL,
                password: SUPERUSER_PASSWORD,
                isAdmin: true,
            },
        });
        console.log('Superuser created successfully.');
    }
}
