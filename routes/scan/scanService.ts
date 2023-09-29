import {ScanStore} from "./scanStore";
import {UserStore} from "../user/userStore";
import {QrCodeStore} from "../qrCodes/QrCodeStore";
import {HttpError} from "../../utils/httpError";

export class ScanService {
    private scannedStore: ScanStore;
    private userStore: UserStore;
    private qrCodeStore: QrCodeStore;


    constructor() {
        this.scannedStore = new ScanStore();
        this.userStore = new UserStore();
        this.qrCodeStore = new QrCodeStore();
    }

    async canRedeem(userID: string, qrID: string): Promise<string | HttpError> {
        const scannedEntry = await this.scannedStore.getByIds(userID, qrID);
        if (scannedEntry !== undefined) return new HttpError(417, "Qr-Code was already scanned!");

        return "ok";
    }

    async redeem(userID: string, qrID: string): Promise<number | HttpError> {
        const canRedeem = await this.canRedeem(userID, qrID);
        if (canRedeem instanceof HttpError) return canRedeem;

        const qrCode = await this.qrCodeStore.getQrCodeByID(qrID);
        if (qrCode === undefined) return new HttpError(404, "The scanned Qr-Code doesn't exist!");

        const points = await this.userStore.addPoints(userID, qrCode.points);
        if (points === undefined) return new HttpError(404, "The user to add doesn't exist!");

        const scannedEntry = await this.scannedStore.createScannedEntry(userID, qrID);
        if (scannedEntry === undefined) return new HttpError(500, "Failed to create scanned entry");

        return points;
    }
}