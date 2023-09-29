import { pool } from "../../db";
import {User} from "./user";
import {QueryResult} from "pg";

export class UserStore {
    async getUserByID(userID: string): Promise<User | undefined> {
        const selectUserByID =
            'select * from general."User" u where u.id = $1';

        try {
            const users: QueryResult<User> = await pool.query(selectUserByID, [userID])
            return users.rows[0];
        } catch (e) {
            console.log(e)
            return undefined;
        }
    }

    async getUserByName(name: string): Promise<User | undefined> {
        const selectUserByName =
            'select * from general."User" u where u.name = $1';

        try {
            const users: QueryResult<User> = await pool.query(selectUserByName, [name]);
            return users.rows[0];
        } catch (e) {
            console.log(e)
            return undefined;
        }
    }

    async createDefaultUser(name: string): Promise<string | undefined> {
        const putUserWithName =
            'insert into general."User" (name) values ($1);';

        try {
            await pool.query(putUserWithName, [name]);
            const user = await this.getUserByName(name);
            if (user === undefined) return undefined;
            return user.id;
        } catch (e) {
            console.log(e)
            return undefined;
        }
    }

    async deleteUserByID(userID: string) {
        const deleteUserWithId =
            'delete from general."User" u where u.id = $1;';

        try {
            await pool.query(deleteUserWithId, [userID]);
        } catch (e) {}
    }
}