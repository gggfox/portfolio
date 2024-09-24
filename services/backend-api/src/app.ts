import "reflect-metadata";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { UserController } from "./Features/Users/User.controller";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(UserController);

//initWebSocket(server);
app.get("/health", (_req: Request, res: Response) => {
  res.send("server is listening");
});

export const server = http.createServer(app);
