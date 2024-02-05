console.log("Hello, world!");
import { Elysia } from "elysia";
import { healthCheck } from "./routes/health-check";
import { createUser } from "./routes/create-user";
import { getUserByEmail } from "./routes/get-user-by-email";
import { updateUser } from "./routes/update-user";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { logger } from "@bogeychan/elysia-logger";
import { rateLimit } from "elysia-rate-limit";

export const server = new Elysia()
  .use(rateLimit({ max: 5 }))
  .onError(({ code }) => {
    if (code === "VALIDATION")
      return {
        status: 400,
        body: {
          message: "Validation error",
        },
      };
  })
  .use(
    logger({
      autoLogging: true,
    })
  )
  .use(cors({ methods: ["GET", "POST", "PUT"] }))
  .use(
    swagger({
      path: "/api",
      theme: "material",
      exclude: ["/api/json", "/api"],
    })
  )
  .use(healthCheck)
  .use(createUser)
  .use(getUserByEmail)
  .use(updateUser);
