import express, {NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import logger from "morgan";
import {initDB, pool} from "./db";
import indexRouter from "./routes/index"
import {UserController} from "./routes/user/userController"
import {QrCodeController} from "./routes/qrCodes/qrCodeController";
import {ScanController} from "./routes/scan/scanController";
import cors from "cors"
import fs from "fs";
import https from "https";

require('dotenv').config();

const args = process.argv.slice(2);

let servePort: number;
let dbIP: string;
let dbPort: number;
let dbUser: string;
let dbPassword: string;

if (args.indexOf("prod") != -1) {
    servePort = 8000;
    dbIP = process.env.PROD_DB_IP as string;
    dbPort = process.env.PROD_DB_PORT as unknown as number;
    dbUser = process.env.PROD_DB_USER as string;
    dbPassword = process.env.PROD_DB_PASSWORD as string;
} else {
    servePort = 8000;
    dbIP = "127.0.0.1";
    dbPort = 5432;
    dbUser = "admin";
    dbPassword = "test";
}

console.log(dbIP);
console.log(dbPort);
console.log(dbUser);
console.log(dbPassword);

initDB(dbIP, dbPort, dbUser, dbPassword);

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO Kinda scuffed way to check if db is reachable!
        await pool.query("select NOW()");
        next()
    } catch (e) {
        res.status(503).send("Database not reachable!");
    }
})

app.use('/', indexRouter);
app.use("/user", new UserController().router);
app.use("/qr", new QrCodeController().router);
app.use("/scan", new ScanController().router);

app.get("*", (req, res) => {})

let credentials = {
    key: fs.readFileSync("backend-privateKey.key"),
    cert: fs.readFileSync("backend.crt"),
}

https.createServer(credentials, app).listen(servePort, "0.0.0.0" || "localhost", () => {
    console.log(`Server listening on port ${servePort}!`)
})