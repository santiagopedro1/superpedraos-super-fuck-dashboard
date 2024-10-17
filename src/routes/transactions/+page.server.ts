import type { PageServerLoad } from './$types';

import { db, schema } from '$lib/db';

import { desc } from 'drizzle-orm';

export const load = (async () => {
	const all_transactions = db
		.select()
		.from(schema.transaction)
		.orderBy(desc(schema.transaction.date))
		.execute();

	return { all_transactions };
}) satisfies PageServerLoad;
