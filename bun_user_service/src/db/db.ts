import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const url = Bun.env.URL_DATABASE!;
const queryClient = postgres(url);
export const db = drizzle(queryClient);
