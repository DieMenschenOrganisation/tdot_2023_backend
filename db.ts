import {Pool} from "pg";

export let pool: Pool;
export function initDB(hostIP: string, hostPort: number, dbUser: string, dbPassword: string) {
    pool = new Pool({
        host: hostIP,
        port: hostPort,
        user: dbUser,
        password: dbPassword,
        database: "admin",
    })

    pool.connect().then(_ => {
        console.log("Connected to database!");
    }).catch(reason => {
        console.log(reason);
        console.log("Failed to connect to database!");
        process.exit(0);
    })
}