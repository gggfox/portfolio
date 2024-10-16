import { HTTP } from "../../Common/http-response.type";
import { User } from "./User.entity";
import express, { Request, Response } from "express";
import { userSchema } from "./User.schema";
import { isAuthenticated } from "../../middleware/isAuthenticated";
const router = express.Router();

router.get("/users", isAuthenticated, async (_req: Request, res: Response) => {
  const users = await User.find();
  const regex = /connect\.sid=([^;]+)/;
  const match = _req.headers.cookie?.match(regex);
  console.log("SESSION", _req.session, { match });
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
  const { username } = req.body;
  const user = new User();
  user.username = username;
  const validation = userSchema.safeParse(user);
  if (validation.success === false) {
    const errors = validation.error.issues.map((issue) => {
      return { message: issue.code, field: issue.path.at(0) };
    });

    res.status(HTTP.BAD_REQUEST).send({ errors });
  }
  const usernameExists = await User.findOneBy({ username });
  if (usernameExists) {
    res.status(HTTP.BAD_REQUEST).send({
      errors: [
        { message: `username '${username}' is taken`, field: "username" },
      ],
    });
  }
  console.log(usernameExists);
  // check if user exists in db
  // validate user data
  await user.save();
  res.status(HTTP.CREATED).send({ data: user, errors: [] });
});

// router.delete("/user", async (req: Request, res: Response) => {
//   const { username, password } = req.body;
// });

export { router as UserController };
