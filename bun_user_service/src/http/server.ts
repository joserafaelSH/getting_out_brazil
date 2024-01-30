console.log("Hello, world!");
import { Elysia } from "elysia";
import { healthCheck } from "./routes/health-check";
import { createUser } from "./routes/create-user";

export const server = new Elysia().use(healthCheck).use(createUser);
