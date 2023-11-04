import {Response} from "express";
import {HttpError} from "./httpError";
import {WSError} from "./WSError";
import {Socket} from "socket.io";

export function sendHttpResult<T>(res: Response, dataToSend: T|HttpError) {
    if (dataToSend instanceof HttpError) {
        res.status(dataToSend.code).send(dataToSend.message);
    } else {
        res.json(dataToSend)
    }
}

export function sendWSErrorIfPresent(socket: Socket, error: WSError|null) {
    if (error == null) return;
    socket.emit("error", error.message);
}

export function replaceIfNull<T,K>(value: T|null, replacement: K): T|K {
    if (value == null) return replacement;
    return value;
}