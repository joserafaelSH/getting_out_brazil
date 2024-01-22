import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_name: text('user_name').notNull(),
  password: text('password').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull(),
  last_login: timestamp('last_login').defaultNow().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  is_active: boolean('is_active').default(true).notNull(),
});
