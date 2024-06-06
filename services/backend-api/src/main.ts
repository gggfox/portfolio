import "reflect-metadata";
import express, { Request, Response } from "express";
import { initWebSocket } from "./Infrastructure/websocket";
import http from "http";

const app = express();
const port = 8080;
const server = http.createServer(app);

// http
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

initWebSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
