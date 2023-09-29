import express, {Request, Response, Router} from "express";
import {ScanService} from "./scanService";
import {sendResult} from "../../utils/resolver";

export class ScanController {
    router: Router;
    service: ScanService;

    constructor() {
        this.router = express.Router();
        this.service = new ScanService();
        this.init();
    }

    private init() {
        this.router.get("/canRedeem/:userID&:qrID", async (req: Request, res: Response) => {
            const okOrError = await this.service.canRedeem(req.params.userID, req.params.qrID);
            sendResult(res, okOrError);
        })
        this.router.get("/canRedeem/*", (_req: Request, res: Response) => {
            res.status(400).send("No user or qr-code id passed!");
        })

        this.router.get("/redeem/:userID&:qrID", async (req: Request, res: Response) => {
            const pointsOrError = await this.service.redeem(req.params.userID, req.params.qrID);
            sendResult(res, pointsOrError);
        })
        this.router.get("/redeem/*", (_req: Request, res: Response) => {
            res.status(400).send("No user or qr-code id passed!");
        })
    }
}