import { db, schema, type Transaction } from '$lib/server/db';

import { sql } from 'drizzle-orm';

function createCode() {
	return Math.random() < 0.7 ? 1 : 2;
}

function createAmount() {
	return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

function createType() {
	return Math.random() < 0.25
		? 'money'
		: Math.random() < 0.5
			? 'credit-card'
			: Math.random() < 0.75
				? 'debit-card'
				: 'pix';
}

export async function seedDB() {
	console.log('Seeding DB');

	const transactions: Array<Omit<Transaction, 'id'>> = Array.from({ length: 50 }, () => ({
		code: createCode(),
		amount: createAmount(),
		date: new Date(),
		type: createType(),
		description: Math.random() > 0.5 ? 'fuck transaction' : null
	}));

	await db.insert(schema.transaction).values(transactions);
}

export async function getSumsAndCounts() {
	const result = await db
		.select({
			moneySum: sql<number>`SUM(
                CASE
                    WHEN ${schema.transaction.type} = 'money' AND ${schema.transaction.code} = 1 THEN ${schema.transaction.amount}
			WHEN ${schema.transaction.type} = 'money' AND ${schema.transaction.code} = 2 THEN -${schema.transaction.amount}
			ELSE 0
			END
			)`,
			otherTypesSum: sql<number>`SUM(
                CASE
                    WHEN ${schema.transaction.type} != 'money' AND ${schema.transaction.code} = 1 THEN ${schema.transaction.amount}
			WHEN ${schema.transaction.type} != 'money' AND ${schema.transaction.code} = 2 THEN -${schema.transaction.amount}
			ELSE 0
			END
			)`,
			moneyCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'money' THEN 1 ELSE NULL END)`,
			creditCardCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'credit-card' THEN 1 ELSE NULL END)`,
			debitCardCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'debit-card' THEN 1 ELSE NULL END)`,
			pixCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'pix' THEN 1 ELSE NULL END)`
		})
		.from(schema.transaction);

	return result[0];
}
