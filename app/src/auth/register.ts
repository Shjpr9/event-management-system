import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Joi from 'joi';
import { ResponseModel } from '../interfaces/ResponseModel.js';

const prisma = new PrismaClient()

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error, value } = schema.validate({name, email, password});

    const result: ResponseModel = {
        ok: false,
        message: "Validation Error!",
    }

    if (error) {
        result.data = error.details.map((detail) => detail.message);
        res.json(result);
        return;
    }

    try {
        const user = await prisma.user.create({
            data: value
        });
        result.ok = true;
        result.message = "User created successfully!";
        result.data = user;
        res.json(result);
    } catch (error: any) {
        result.data = error.message;
        res.json(result);
    }

    
}