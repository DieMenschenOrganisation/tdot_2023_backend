import {Response} from "express";
import {HttpError} from "./httpError";

export function sendResult<T>(res: Response, dataToSend: T|HttpError) {
    if (dataToSend instanceof HttpError) {
        res.status(dataToSend.code).send(dataToSend.message);
    } else {
        res.json(dataToSend)
    }
}