import { db, schema, type Transaction } from '$lib/server/db';

import { sql } from 'drizzle-orm';

const categories: TransactionCategory[] = [
	'Income',
	'Supplier Payments',
	'Staff Payments',
	'Pro-Labore Payments',
	'Office/Administrative Supplies',
	'Utility Payments',
	'Third-Party Payments',
	'Tax Payments',
	'Labor Charges',
	'Asset Acquisition',
	'Bank Fees',
	'Loans',
	'Promotions and Advertising'
];
function weightedChoice(): TransactionCategory {
	const weights = [75, ...Array(categories.length - 1).fill(25 / (categories.length - 1))];
	const total = weights.reduce((a, b) => a + b, 0);
	const rand = Math.random() * total;
	let sum = 0;

	for (let i = 0; i < categories.length; i++) {
		sum += weights[i];
		if (rand < sum) return categories[i];
	}
	return categories[0];
}

function createAmount() {
	return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

function createType() {
	return Math.random() < 0.25
		? 'Money'
		: Math.random() < 0.5
			? 'Credit card'
			: Math.random() < 0.75
				? 'Debit card'
				: 'Pix';
}

export async function seedDB() {
	console.log('Seeding DB');

	const transactions: Array<Omit<Transaction, 'id'>> = Array.from({ length: 100 }, () => {
		const category = weightedChoice();
		const amount = category === 'Income' ? createAmount() : -createAmount();

		return {
			category,
			amount,
			date: new Date(new Date().setHours(0, 0, 0)),
			type: createType(),
			description: Math.random() > 0.5 ? 'fuck transaction' : null
		};
	});

	await db.insert(schema.transaction).values(transactions);
}

export async function getSumsAndCounts() {
	const result = await db
		.select({
			moneySum: sql<number>`SUM(CASE WHEN ${schema.transaction.type} = 'Money' THEN ${schema.transaction.amount} ELSE 0 END)`,
			otherTypesSum: sql<number>`SUM(CASE WHEN ${schema.transaction.type} != 'Money' THEN ${schema.transaction.amount} ELSE 0 END)`,
			moneyCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'Money' THEN 1 ELSE NULL END)`,
			creditCardCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'Credit card' THEN 1 ELSE NULL END)`,
			debitCardCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'Debit card' THEN 1 ELSE NULL END)`,
			pixCount: sql<number>`COUNT(CASE WHEN ${schema.transaction.type} = 'Pix' THEN 1 ELSE NULL END)`
		})
		.from(schema.transaction);

	return result[0];
}
