import express, {Response, Request, Router} from "express";
import {UserService} from "./userService";
import {sendResult} from "../../utils/resolver";
import {UserCreationData} from "./userCreationData";

export class UserController {
    router: Router;
    private service: UserService;

    constructor() {
        this.router = express.Router();
        this.service = new UserService();
        this.init();
    }

    private init() {
        this.router.get("/points/:userID?", async (req: Request, res: Response) => {
            const pointsOrError = await this.service.getUserPoints(req.params.userID);
            sendResult(res, pointsOrError);
        });

        this.router.get("/:userID?", async (req: Request, res: Response) => {
            const userOrError = await this.service.getUser(req.params.userID)
            sendResult(res, userOrError);
        })

        this.router.post("/", async (req: Request, res: Response) => {
            const idOrError = await this.service.createUser(req.body as UserCreationData);
            sendResult(res, idOrError);
        })

        this.router.delete("/:userID?", async (req: Request, res: Response) => {
            const okOrError = await this.service.removeUser(req.params.userID);
            sendResult(res, okOrError);
        })
    }
}