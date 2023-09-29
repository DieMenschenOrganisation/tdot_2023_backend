import express from 'express';
import bodyParser from "body-parser";
import logger from "morgan";
import {initDB} from "./db";
import indexRouter from "./routes/index"
import {UserController} from "./routes/user/userController"
import {QrCodeController} from "./routes/qrCodes/qrCodeController";

require('dotenv').config();

const args = process.argv.slice(2);

let servePort: number;
let dbIP: string;
let dbPort: number;
let dbUser: string;
let dbPassword: string;

if (args.indexOf("prod") != -1) {
    servePort = 80;
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

initDB(dbIP, dbPort, dbUser, dbPassword);

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use("/user", new UserController().router);
app.use("/qr", new QrCodeController().router);

app.listen(servePort, "0.0.0.0", () => {
    console.log(`Server listening on port ${servePort}!`)
})