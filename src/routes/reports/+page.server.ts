import type { Actions, PageServerLoad } from './$types';

import type { DateRange } from 'bits-ui';

import { CalendarDate } from '@internationalized/date';

import { fail } from '@sveltejs/kit';

import { db, schema } from '$lib/db';
import { and, lte, gte, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const { searchParams } = url;

	const period_param = searchParams.get('period');

	let period: { start: Date; end: Date } | undefined;

	if (period_param) {
		const [start_date, end_date] = period_param.split('-');
		const [start_day, start_month, start_year] = start_date.split('/');
		const [end_day, end_month, end_year] = end_date.split('/');

		const start = new Date(Number(start_year), Number(start_month) - 1, Number(start_day));
		const end = new Date(Number(end_year), Number(end_month) - 1, Number(end_day));

		period = {
			start,
			end
		};
	}

	return { period };
};

// export const actions: Actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, zod(formSchema));

// 		if (!form.valid) {
// 			return fail(400, {
// 				form
// 			});
// 		}

// 		const { data } = form;
// 		const { period } = data;

// 		const transactions = await db
// 			.select()
// 			.from(schema.transaction)
// 			.where(
// 				and(gte(schema.transaction.date, period.start), lte(schema.transaction.date, period.end))
// 			)
// 			.orderBy(desc(schema.transaction.date));

// 		return {
// 			form,
// 			transactions: transactions.length > 1 ? transactions : null
// 		};
// 	}
// };
