import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { form_schema } from '$lib/transaction-form-schema';
import { zod } from 'sveltekit-superforms/adapters';

import { db, schema } from '$lib/db';
import { desc } from 'drizzle-orm';

import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';

export const load = (async () => {
	const all_transactions = db
		.select()
		.from(schema.transaction)
		.orderBy(desc(schema.transaction.date))
		.limit(10)
		.execute();

	return { all_transactions, super_form: await superValidate(zod(form_schema)) };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(form_schema));

		if (!form.valid) return fail(400, { form });

		const { data } = form;

		await db.insert(schema.transaction).values(data);

		return message(form, 'Transaction added successfully');
	}
};
