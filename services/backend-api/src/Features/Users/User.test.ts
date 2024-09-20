import request from "supertest";
import { app, server } from "../../app";
import { DataSource } from "typeorm";
import { User } from "./User.entity";
import { HTTP } from "../../Common/http-response.type";

let dataSource: null | DataSource = null;

beforeEach(async () => {
  dataSource = await new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
  });
  await dataSource.initialize();
});

afterEach(() => {
  if (dataSource) {
    dataSource.destroy();
  }
});

describe("User Tests", () => {
  test("Should create a user", async () => {
    await request(server)
      .post("/user")
      .send({
        username: "example",
        password: "example",
      })
      .expect(HTTP.CREATED);
  });

  test("Fetch users", async () => {});

  test("health", async () => {
    await request(app).get("/health").expect(200);
  });
});
