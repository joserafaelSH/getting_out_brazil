console.log("Hello, world!");
import { Elysia } from "elysia";
import { healthCheck } from "./routes/health-check";
import { createUser } from "./routes/create-user";
import { getUserByEmail } from "./routes/get-user-by-email";
import { updateUser } from "./routes/update-user";

export const server = new Elysia()
  .use(healthCheck)
  .use(createUser)
  .use(getUserByEmail)
  .use(updateUser);
