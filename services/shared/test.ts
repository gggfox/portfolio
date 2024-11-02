import { z } from "zod";
import { initContract } from "@ts-rest/core";
export type Test = string;

export const variable = "shared variable";
export function fn() {
  console.log("this is a shared test");
}

const c = initContract();

export const contract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    responses: {
      201: z.string(),
    },
  },
  //   test: {
  //     method: "GET",
  //     path: "/test",
  //     query: z.object({
  //       id: z.number(),
  //     }),
  //     responses: {},
  //   },
});
