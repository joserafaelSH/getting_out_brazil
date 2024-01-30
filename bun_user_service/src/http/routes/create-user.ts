import { Elysia, t } from "elysia";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../../domain/entity/user/user";

export const updateUser = new Elysia().post(
  "/api/v1/update/user",
  async ({ body }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));

    if (user.length > 0) {
      return {
        status: 400,
        body: {
          message: "User already exists",
        },
      };
    }

    const newUser = new User({
      email: body.email,
      first_name: body.first_name,
      last_login: null,
      last_name: body.last_name,
      password: body.password,
      user_name: body.user_name,
    });

    await db.insert(users).values(newUser.toJSON()).execute();

    return {
      status: 200,
      body: {
        message: "User created successfully",
      },
    };
  },
  {
    body: t.Object({
      user_name: t.String(),
      password: t.String(),
      first_name: t.String(),
      last_name: t.String(),
      email: t.String(),
    }),
  }
);
