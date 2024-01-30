import { Elysia, t } from "elysia";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../../domain/entity/user/user";

export const createUser = new Elysia().post(
  "/api/v1/create/user",
  async (any) => {},
  {
    body: t.Object({
      user_name: t.String(),
      password: t.String(),
      first_name: t.String(),
      last_name: t.String(),
      email: t.String(),
    }),
    query: t.Object({
      id: t.String(),
    }),
  }
);
