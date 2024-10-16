// import { ServerResponse } from "../../Common/Response";

import express from "express";

const router = express.Router();

// router.get("/transactions", async (_req: Request, res: Response) => {
//   const response = new ServerResponse();
//   response.data = await Transaction.find({ where: userId });
//   res.status(200).send(response);
// });

// router.delete("/user", async (req: Request, res: Response) => {
//   const { username, password } = req.body;
// });

export { router as TransactionController };
