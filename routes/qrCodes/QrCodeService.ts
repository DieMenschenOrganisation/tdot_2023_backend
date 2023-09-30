import {QrCodeStore} from "./QrCodeStore";
import {QrCode} from "./QrCode";
import {HttpError} from "../../utils/httpError";

export class QrCodeService {
    private store: QrCodeStore;

    constructor() {
        this.store = new QrCodeStore();
    }

    async getQrCode(qrID: string | undefined): Promise<QrCode | HttpError> {
        if (qrID === undefined) return new HttpError(400, "Es wurde keine QR-Code-ID übergeben!");

        const qrCode = await this.store.getQrCodeByID(qrID);
        if (qrCode === undefined) return new HttpError(406, "Es gibt keinen QR-Code mit dieser ID!");

        return qrCode;
    }
}