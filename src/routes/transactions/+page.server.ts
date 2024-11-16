import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import {
	new_transaction_schema,
	edit_transaction_schema
} from '$lib/forms/transaction-form-schema';
import { zod } from 'sveltekit-superforms/adapters';

import { db, schema } from '$lib/db';
import { desc, eq } from 'drizzle-orm';

import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';

export const load = (async () => {
	const all_transactions = db
		.select()
		.from(schema.transaction)
		.orderBy(desc(schema.transaction.date))
		.execute();

	const add_transaction_form = await superValidate(zod(new_transaction_schema));
	const edit_transaction_form = await superValidate(zod(edit_transaction_schema));

	return { all_transactions, add_transaction_form, edit_transaction_form };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const form = await superValidate(request, zod(new_transaction_schema));

		if (!form.valid) return fail(400, { form });

		const { data } = form;

		await db.insert(schema.transaction).values(data);

		return message(form, 'Transaction added successfully');
	},

	edit: async ({ request }) => {
		const form = await superValidate(request, zod(edit_transaction_schema));

		if (!form.valid) return fail(400, { form });

		const { data } = form;

		await db.update(schema.transaction).set(data).where(eq(schema.transaction.id, data.id));

		return message(form, 'Transaction edited successfully');
	}
};
