import { Elysia, t } from "elysia";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../../domain/entity/user/user";
import bearer from "@elysiajs/bearer";
import type { IAuthService } from "../../gateway/auth.service.interface";
import { AuthServiceMock } from "../../gateway/auth.service.mock";
import {
  userNameValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  lastLoginValidator,
} from "../../domain/bun.validators";

export const updateUser = new Elysia().use(bearer()).put(
  "/api/v1/update/user",
  async ({ body, query, bearer }) => {
    if (!bearer) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const authService: IAuthService = new AuthServiceMock();
    const isValid = await authService.validateToken(bearer);

    if (!isValid) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const { id } = query;

    const user = await db.select().from(users).where(eq(users.id, id));
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
      id
    );
    const last_login_date = new Date(body.last_login);
    currentUser.update({ ...body, last_login: last_login_date });

    await db.update(users).set(currentUser.toJSON()).where(eq(users.id, id));

    return {
      status: 200,
      body: {
        message: "User updatede successfully",
      },
    };
  },
  {
    body: t.Object({
      ...userNameValidator,
      ...passwordValidator,
      ...firstNameValidator,
      ...lastNameValidator,
      ...emailValidator,
      ...lastLoginValidator,
    }),
    query: t.Object({
      id: t.String(),
    }),
  }
);
