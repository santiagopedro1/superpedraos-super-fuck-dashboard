import type { PageServerLoad } from './$types';

import { db, schema } from '$lib/db';
import { desc } from 'drizzle-orm';

export const load = (async () => {
	const latest_transactions = await db
		.select()
		.from(schema.transaction)
		.orderBy(desc(schema.transaction.date))
		.limit(10);

	return { latest_transactions };
}) satisfies PageServerLoad;
