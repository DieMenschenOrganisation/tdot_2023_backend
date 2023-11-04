import express, {Router} from "express";
import {RequestService} from "./RequestService";
import {sendHttpResult} from "../../utils/resolver";

export class RequestController {
    router: Router;
    private requestService: RequestService;


    constructor() {
        this.router = express.Router();
        this.requestService = new RequestService();
        this.init();
    }

    private init() {
        this.router.get("/", (req, res) => {
            let result =
                this.requestService.requestHost(req.query.code as string, req.query.userID as string);
            sendHttpResult(res, replaceIfNull(result, "ok"));
        })
    }
}

function replaceIfNull<K, T>(original: K|null, replacement: T): K|T {
    if (original == null) return replacement;
    return original;
}