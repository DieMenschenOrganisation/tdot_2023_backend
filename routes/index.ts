import express, { Response, Request } from "express";
const router = express.Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response) => {
  res.send("Hello world!");
});

export default router;