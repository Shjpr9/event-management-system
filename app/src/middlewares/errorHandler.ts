import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { sendResponse } from '../response/responseHandler';

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
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
