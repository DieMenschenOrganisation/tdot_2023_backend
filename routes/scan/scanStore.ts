import {ScannedEntry} from "./scannedEntry";
import {QueryResult} from "pg";
import {pool} from "../../db";

export class ScanStore {

    async getByIds(userID: string, qrID: string): Promise<ScannedEntry | undefined> {
        const getScannedEntryById =
            'select * from general."Scanned" s where s.user_id = $1 and s.qr_code_id = $2;';

        try {
            const scannedEntry: QueryResult<ScannedEntry> = await pool.query(getScannedEntryById, [userID, qrID]);
            if (scannedEntry.rows.length !== 1) return undefined;
            return scannedEntry.rows[0];
        } catch (e) {
            return undefined;
        }
    }

    async createScannedEntry(userID: string, qrID: string): Promise<ScannedEntry | undefined> {
        const createScannedEntryByIDs =
            'insert into general."Scanned" (user_id, qr_code_id) values ($1, $2);';

        try {
            await pool.query(createScannedEntryByIDs, [userID, qrID]);
            return {user_id: userID, qr_code_id: qrID};
        } catch (e) {
            return undefined;
        }
    }
}