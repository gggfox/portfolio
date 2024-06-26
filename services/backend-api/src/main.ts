import "reflect-metadata";
import express, { Request, Response } from "express";
import { initWebSocket } from "./Infrastructure/websocket.js";
import http from "http";
import { AppDataSource } from "./data-source.js";
import { User } from "./entity/User.js";

const app = express();
app.use(express.json());
const server = http.createServer(app);

AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log(
    //   "Here you can setup and run express / fastify / any other framework."
    // );
  })
  .catch((error) => console.log(error));

// http
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

async function main() {}

initWebSocket(server);

server.listen(process.env.API_PORT, () => {
  console.log(`Example app listening on port ${process.env.API_PORT}`);
  main();
});
