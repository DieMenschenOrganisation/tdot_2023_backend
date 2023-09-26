import express  from 'express';
import logger from "morgan";

const PORT = 8000;

import indexRouter from "./routes/index"

const app = express();
app.use(logger('dev'));

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`)
})