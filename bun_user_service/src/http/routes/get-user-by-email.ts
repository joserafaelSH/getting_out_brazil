import { Elysia, t } from "elysia";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../../domain/entity/user/user";

export const getUserByEmail = new Elysia().get(
  "/api/v1/get/user",
  async ({ query }) => {
    const { email } = query;
    console.log(email);
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      return {
        status: 404,
        body: {
          message: "User Not Found",
        },
      };
    }

    const newLocal = { ...user[0] };
    const currentUser = new User(
      {
        email: newLocal.email!,
        first_name: newLocal.first_name!,
        last_login: newLocal.last_login!,
        last_name: newLocal.last_name!,
        password: newLocal.password!,
        user_name: newLocal.user_name!,
      },
      newLocal.id
    );
    return {
      status: 201,
      data: currentUser.toJSON(),
    };
  },
  {
    query: t.Object({
      email: t.String(),
    }),
  }
);
