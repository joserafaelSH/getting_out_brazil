import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

try {
  const url = Bun.env.URL_DATABASE!;
  console.log("migration started");
  const queryClient = postgres(url);
  const db = drizzle(queryClient);
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  console.log("migration ended");
  process.exit(0);
} catch (e) {
  console.log(e);
  process.exit(1);
}
