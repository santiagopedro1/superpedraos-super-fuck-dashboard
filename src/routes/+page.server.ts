import type { PageServerLoad } from './$types';

import { db, schema } from '$lib/db';

export const load = (async () => {
	const { transaction } = schema;
	const all_transactions = await db
		.select({
			amount: transaction.amount,
			code: transaction.code,
			destination: transaction.destination
		})
		.from(transaction);

	let sum_in_bank = 0;
	let sum_out_bank = 0;
	let sum_in_cash = 0;
	let sum_out_cash = 0;

	for (const transaction of all_transactions) {
		if (transaction.code === 1)
			if (transaction.destination === 'caixa') sum_in_bank += transaction.amount;
			else sum_in_cash += transaction.amount;
		else if (transaction.code === 2)
			if (transaction.destination === 'caixa') sum_out_bank += transaction.amount;
			else sum_out_cash += transaction.amount;
	}

	return { sum_in_bank, sum_out_bank, sum_in_cash, sum_out_cash };
}) satisfies PageServerLoad;
