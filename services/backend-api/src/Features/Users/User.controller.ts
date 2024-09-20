import { HTTP } from "../../Common/http-response.type";
import { User } from "./User.entity";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/users", async (_req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findOneBy({ id });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("error retriving user");
  }
});

router.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = new User();
  user.username = username;
  user.password = password;
  await user.save();
  res.status(HTTP.CREATED).send(user);
});

// router.delete("/user", async (req: Request, res: Response) => {
//   const { username, password } = req.body;
// });

export { router as UserController };
