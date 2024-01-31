console.log("Hello, world!");
import { Elysia } from "elysia";
import { healthCheck } from "./routes/health-check";
import { createUser } from "./routes/create-user";
import { getUserByEmail } from "./routes/get-user-by-email";
import { updateUser } from "./routes/update-user";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

export const server = new Elysia()

  .use(cors({ methods: ["GET", "POST", "PUT"] }))
  .use(
    swagger({
      path: "/api",
      theme: "material",
    })
  )
  .use(healthCheck)
  .use(createUser)
  .use(getUserByEmail)
  .use(updateUser);
