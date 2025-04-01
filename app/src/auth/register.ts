import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel.js';
import { prisma } from '../client.js';
import { registerSchema } from '../validation/validations.js';
import { sendResponse } from '../response/responseHandler.js';

export async function register(req: Request, res: Response) {
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
        sendResponse(res, true, 'User created successfully!', user);
    } catch (error: any) {
        sendResponse(res, false, 'Error creating user!', error.message);
    }
}
