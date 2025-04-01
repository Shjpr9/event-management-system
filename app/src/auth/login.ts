import { Request, Response } from 'express';
import { prisma } from '../client.js';
import { loginSchema } from '../validation/validations.js';
import { sendResponse } from '../response/responseHandler.js';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        sendResponse(res, false, 'JWT secret not found!', null);
        return;
    }

    const { email, password } = req.body;
    const { error, value } = loginSchema.validate({ email, password });

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
        const user = await prisma.user.findFirstOrThrow({
            where: value,
        });
        const token = jwt.sign({ user_id: user.id }, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
        sendResponse(res, true, 'User logged in successfully!', {token});
    } catch (error: any) {
        sendResponse(res, false, 'Error logging in the user!', error.message);
    }
}
