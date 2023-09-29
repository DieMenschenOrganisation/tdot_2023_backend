import {Client} from "ts-postgres";
import { getClient } from "../../db";
import {User} from "./user";
import {HttpError} from "../../utils/httpError";

export class UserStore {
    private client: Client;

    constructor() {
        this.client = getClient();
    }

    async getUser(userID: string): Promise<User | undefined> {
        const selectUser = 'select * from general."User" u where u.id = $1';
        console.log("a")
        try {
            const result = await this.client.query(
                selectUser,
                [userID],
            );
            console.log("b")

            console.log(result)
        } catch (e) {
            return undefined;
        }
    }
}