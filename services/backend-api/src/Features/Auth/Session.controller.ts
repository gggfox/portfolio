import { HTTP } from "../../Common/http-response.type";
import express, { Request, Response } from "express";
import { Session } from "./Session.entity";
import { ServerResponse } from "../../Common/Response";
const router = express.Router();

router.get("/sessions", async (_req: Request, res: Response) => {
  const response: ServerResponse = {
    data: await Session.find(),
    errors: null,
  };
  res.status(HTTP.OK).json(response);
});

export { router as SessionController };
