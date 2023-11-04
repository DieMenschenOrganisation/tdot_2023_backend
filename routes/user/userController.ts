import express, {Response, Request, Router} from "express";
import {UserService} from "./userService";
import {UserCreationData} from "./userCreationData";
import {replaceIfNull, sendHttpResult} from "../../utils/resolver";

export class UserController {
    router: Router;
    private service: UserService;

    constructor() {
        this.router = express.Router();
        this.service = new UserService();
        this.init();
    }

    private init() {
        this.router.get("/all", async (req: Request, res: Response) => {
            const usersOrError = await this.service.getAllUsers();
            sendHttpResult(res, usersOrError);
        })

        this.router.get("/points/redeem", async (req: Request, res: Response) => {
            const okOrError = await this.service.redeemPoints(req.query.userID as string, req.query.points as string);
            sendHttpResult(res, okOrError)
        });

        this.router.get("/points/:userID?", async (req: Request, res: Response) => {
            const pointsOrError = await this.service.getUserPoints(req.params.userID);
            sendHttpResult(res, pointsOrError);
        });

        this.router.get("/:userID?", async (req: Request, res: Response) => {
            const userOrError = await this.service.getUser(req.params.userID)
            sendHttpResult(res, userOrError);
        })

        this.router.post("/", async (req: Request, res: Response) => {
            const idOrError = await this.service.createUser(req.body as UserCreationData);
            sendHttpResult(res, idOrError);
        })

        this.router.delete("/:userID?", async (req: Request, res: Response) => {
            const okOrError = await this.service.removeUser(req.params.userID);
            sendHttpResult(res, replaceIfNull(okOrError, "ok"));
        })


    }
}