import "reflect-metadata";
import { AppDataSource } from "./Infrastructure/data-source";
import { server } from "./app";
import { DataSource } from "typeorm";

export const API_PORT = process.env.API_PORT ?? 3000;

export async function start(appDataSource: DataSource) {
  await appDataSource.initialize();

  server.listen(API_PORT, () => {
    console.log(`Example app listening on port ${API_PORT}`);
  });
  return server;
}

start(AppDataSource);
