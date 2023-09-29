import {Client} from "ts-postgres";

let client: Client;

export function initDB(hostIP: string, hostPort: number, dbUser: string, dbPassword: string) {
    client = new Client({
        host: hostIP,
        port: hostPort,
        user: dbUser,
        password: dbPassword,
        database: "tdot_casino",
        connectionTimeout: 2000
    })

    client.connect().then(_ => {
        console.log("Connected to database!");
    }).catch(reason => {
        console.log(`Couldn't connect to database because: ${reason}!`);
    })
}

export function getClient(): Client {
    return client;
}