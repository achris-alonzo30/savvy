import * as dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found in environment');

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});