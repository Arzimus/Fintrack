import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

// initalize the neon connection to a serverless postgressql db,
// the ! tells that the url will always be defined

export const sql = neon(process.env.DATABASE_URL!);

// This initializes the Drizzle ORM with the Neon connection established above.

export const db = drizzle(sql, { schema });




