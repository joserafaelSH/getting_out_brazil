import { Elysia, t } from "elysia";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../../domain/entity/user/user";
import { db } from "../../db/db";
import bearer from "@elysiajs/bearer";
import { AuthServiceMock } from "../../gateway/auth.service.mock";
import type { IAuthService } from "../../gateway/auth.service.interface";

export const getUserByEmail = new Elysia().use(bearer()).get(
  "/api/v1/get/user",
  async ({ query, bearer }) => {
    if (!bearer) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const authService: IAuthService = new AuthServiceMock();
    if (!(await authService.validateToken(bearer))) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const { email } = query;

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
