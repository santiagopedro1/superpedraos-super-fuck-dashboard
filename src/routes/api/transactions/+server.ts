import type { RequestHandler } from './$types';

import { fail, json } from '@sveltejs/kit';

import { db, schema } from '$lib/db';
import { and, lte, gte, desc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = url;

	const start_date = searchParams.get('start');
	const end_date = searchParams.get('end');

	let period: { start: Date; end: Date } | undefined;

	if (start_date && end_date) {
		const [start_day, start_month, start_year] = start_date.split('/');
		const [end_day, end_month, end_year] = end_date.split('/');

		const start = new Date(Number(start_year), Number(start_month) - 1, Number(start_day));
		const end = new Date(Number(end_year), Number(end_month) - 1, Number(end_day));

		period = {
			start,
			end
		};

		const transactions = await db
			.select()
			.from(schema.transaction)
			.where(
				and(gte(schema.transaction.date, period.start), lte(schema.transaction.date, period.end))
			)
			.orderBy(desc(schema.transaction.date));

		return json(transactions);
	} else {
		throw fail(400, { message: 'Invalid period' });
	}
};
