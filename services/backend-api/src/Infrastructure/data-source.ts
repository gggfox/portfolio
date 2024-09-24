import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../Features/Users/User.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
};

export const AppDataSource = new DataSource(dataSourceOptions);
