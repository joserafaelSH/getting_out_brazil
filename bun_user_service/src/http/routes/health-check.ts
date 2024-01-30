import { Elysia } from "elysia";

export const healthCheck = new Elysia().get(
  "/api/v1/health-check",
  async () => ({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
);
