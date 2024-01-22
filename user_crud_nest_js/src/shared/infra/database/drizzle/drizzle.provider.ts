// import { drizzle } from 'drizzle-orm/postgres-js';

// import postgres from 'postgres';

// export const migrationClient = postgres(
//   'postgres://postgres:adminadmin@0.0.0.0:5432/db',
//   { max: 1 },
// );

// const queryClient = postgres('postgres://postgres:adminadmin@0.0.0.0:5432/db');
// export const db = drizzle(queryClient);

export const DrizzleAsyncProvider = 'DrizzleProvider';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

export const DrizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const pg = postgres(process.env.URL_DB, {
        max: 5,
      });
      const db = drizzle(pg, { schema });
      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
