import type { PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { new_transaction_schema } from '$lib/forms/transaction-form-schema';
import { zod } from 'sveltekit-superforms/adapters';

import { db, schema } from '$lib/db';

import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';

export const load = (async () => {
	const new_transaction_form = await superValidate(zod(new_transaction_schema));

	return { new_transaction_form };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const form = await superValidate(request, zod(new_transaction_schema));

		if (!form.valid) return fail(400, { form });

		const { data } = form;

		await db.insert(schema.transaction).values(data);

		return message(form, 'Transaction added successfully');
	}
};
