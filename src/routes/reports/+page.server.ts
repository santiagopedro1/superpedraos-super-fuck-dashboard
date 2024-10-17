import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { formSchema } from '$lib/form-schema';

import { db, schema } from '$lib/db';
import { and, lte, gte, desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;
		const { period } = data;

		const transactions = await db
			.select()
			.from(schema.transaction)
			.where(
				and(gte(schema.transaction.date, period.start), lte(schema.transaction.date, period.end))
			)
			.orderBy(desc(schema.transaction.date));

		return {
			form,
			transactions: transactions.length > 1 ? transactions : null
		};
	}
};
