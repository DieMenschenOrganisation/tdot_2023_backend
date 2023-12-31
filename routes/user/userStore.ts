import { pool } from "../../db";
import {User} from "./user";
import {QueryResult} from "pg";

export class UserStore {
    async getUserByID(userID: string): Promise<User | undefined> {
        const selectUserByID =
            'select * from general."User" u where u.id = $1';

        try {
            const users: QueryResult<User> = await pool.query(selectUserByID, [userID])
            if (users.rows.length !== 1) return undefined;
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
            if (users.rows.length !== 1) return undefined;
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

    async addPoints(userID: string, points: number): Promise<number | undefined> {
        const updateUserPoints =
            'update general."User" u set points = u.points + $2 where u.id = $1;';

        try {
            await pool.query(updateUserPoints, [userID, points]);
            return points;
        } catch (e) {
            return undefined;
        }
    }

    async getAllUsers(): Promise<User[]> {
        const getAllUsers = 'select * from general."User"';

        return (await pool.query(getAllUsers)).rows;
    }
}