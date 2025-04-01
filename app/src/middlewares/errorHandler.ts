import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendResponse } from '../response/responseHandler.js';

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const {ValidationError} = Joi;
    if (err instanceof ValidationError) {
        sendResponse(
            res,
            false,
            'Validation error!',
            err.details.map(detail => detail.message)
        );
        return;
    }

    sendResponse(res, false, 'Internal server error!', err.message);
}
