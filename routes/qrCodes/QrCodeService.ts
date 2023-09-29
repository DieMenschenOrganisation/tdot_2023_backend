import {QrCodeStore} from "./QrCodeStore";
import {QrCode} from "./QrCode";
import {HttpError} from "../../utils/httpError";

export class QrCodeService {
    private store: QrCodeStore;

    constructor() {
        this.store = new QrCodeStore();
    }

    async getQrCode(qrID: string | undefined): Promise<QrCode | HttpError> {
        if (qrID === undefined) return new HttpError(400, "No qr id received!");

        const qrCode = await this.store.getQrCodeByID(qrID);
        if (qrCode === undefined) return new HttpError(406, "No qr-code found with that id!");

        return qrCode;
    }
}