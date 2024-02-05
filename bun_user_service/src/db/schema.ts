import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  user_name: text("user_name"),
  password: text("password"),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email").unique(),
  last_login: timestamp("last_login"),
  created_at: timestamp("created_at").defaultNow(),
});
