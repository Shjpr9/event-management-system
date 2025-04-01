import { Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

export function sendResponse(
    res: Response,
    ok: boolean = false,
    message: string = 'Internal server error!',
    data: any = null
) {
    const result: ResponseModel = { ok, message, data };
    res.json(result);
}
