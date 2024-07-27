import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found in environment');

export default {
    schema: './db/schema.ts',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    strict: true,
    verbose: true
} satisfies Config;