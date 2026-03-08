import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_MIGRATIONS || process.env.DATABASE_URL!,
  },
  schemaFilter: ['film_festival'],
  verbose: true,
  strict: true,
});
