import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { registerSchema } from '../validation/validations.js';
import { sendResponse } from '../response/responseHandler.js';
import jwt from 'jsonwebtoken';

// TODO: password hashing

export async function register(req: Request, res: Response) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        sendResponse(res, false, 'JWT secret not found!', null);
        return;
    }

    const { name, email, password } = req.body;
    const { error, value } = registerSchema.validate({ name, email, password });

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
        const user = await prisma.user.create({
            data: value,
        });
        const token = jwt.sign({ user_id: user.id }, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
        sendResponse(res, true, 'User created successfully!', { token });
    } catch (error: any) {
        sendResponse(res, false, 'Error creating user!', error.message);
    }
}
