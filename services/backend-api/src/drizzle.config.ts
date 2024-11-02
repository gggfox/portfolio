import { defineConfig } from "drizzle-kit";

export const DRIZZLE_URL = `postgresql://${process.env.POSTGRES_USER!}:${process
  .env.POSTGRES_PASSWORD!}@${process.env.POSTGRES_HOST!}:${5432}/postgres`;

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DRIZZLE_URL,
    ssl: true,
  },
});
