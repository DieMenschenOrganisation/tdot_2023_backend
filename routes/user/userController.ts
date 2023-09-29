import express, {Response, Request, Router} from "express";
import {UserService} from "./userService";
import {HttpError} from "../../utils/httpError";
import {sendResult} from "../../utils/resolver";

export class UserController {
    router: Router;
    private service: UserService;

    constructor() {
        this.router = express.Router();
        this.service = new UserService();
        this.init();
    }

    private init() {
        this.router.get("/:userID?", async (req: Request, res: Response) => {
            const userOrError = await this.service.getUser(req.params.userID)
            sendResult(res, userOrError);
        })
    }
}