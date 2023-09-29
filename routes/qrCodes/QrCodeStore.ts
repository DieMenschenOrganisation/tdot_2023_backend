import {QrCode} from "./QrCode";
import {QueryResult} from "pg";
import {pool} from "../../db";

export class QrCodeStore {

    async getQrCodeByID(qrID: string): Promise<QrCode | undefined> {
        const getQrCodeByID = 'select * from general."QrCode" q where q.id = $1';

        try {
            const qrCodes: QueryResult<QrCode> = await pool.query(getQrCodeByID, [qrID]);
            if (qrCodes.rows.length !== 1) return undefined;
            return qrCodes.rows[0];
        } catch (e) {
            return undefined;
        }
    }
}