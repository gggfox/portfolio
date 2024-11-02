import "reflect-metadata";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { UserController } from "./Features/Users/User.controller";
import passport from "passport";
import { TypeormStore } from "connect-typeorm";

//import cookieSession from "cookie-session";
import { setup } from "./Features/Auth/passport-google-auth";
import session from "express-session";
import { AuthController } from "./Features/Auth/Auth.controller";
import { Session } from "./Features/Auth/Session.entity";
import { AppDataSource } from "./Infrastructure/data-source";
import { SessionController } from "./Features/Auth/Session.controller";
import { contract, fn } from "@shared/test";
import * as client from "prom-client";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { drizzle } from "drizzle-orm/node-postgres";
import { DRIZZLE_URL } from "./drizzle.config";

drizzle(DRIZZLE_URL);
export const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set secure to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires after 1 day (24 hours)
    },
    store: new TypeormStore({
      cleanupLimit: 2,
      ttl: 86400, // Session expiry in seconds (1 day in this case)
    }).connect(AppDataSource.getRepository(Session)),
  })
);
app.use(passport.initialize());
app.use(passport.session());
setup();
app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use(AuthController);
app.use(UserController);
app.use(SessionController);
app.options("*", cors());

//initWebSocket(server);
app.get("/health", (_req: Request, res: Response) => {
  fn();
  res.send("server is listening");
});

const s = initServer();

const router = s.router(contract, {
  getPosts: async () => {
    return {
      status: 201,
      body: "test",
    };
  },
});

createExpressEndpoints(contract, router, app);

export const server = http.createServer(app);
