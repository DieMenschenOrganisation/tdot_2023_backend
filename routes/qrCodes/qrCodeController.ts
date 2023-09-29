import express, {Request, Response, Router} from "express";
import {QrCodeService} from "./QrCodeService";
import {sendResult} from "../../utils/resolver";

export class QrCodeController {
    router: Router;
    private service: QrCodeService;

    constructor() {
        this.router = express.Router();
        this.service = new QrCodeService();
        this.init();
    }

    private init() {
        this.router.get("/:qrID?", async (req: Request, res: Response) => {
            const qrCodeOrError = await this.service.getQrCode(req.params.qrID);
            sendResult(res, qrCodeOrError);
        });
    }
}