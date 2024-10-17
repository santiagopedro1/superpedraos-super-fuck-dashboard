import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: './src/lib/db/sqlite.db'
	}
} satisfies Config;
