import { mysqlTable, real, varchar, timestamp } from 'drizzle-orm/mysql-core';

import { createId } from '@paralleldrive/cuid2';

export const transaction = mysqlTable('transaction', {
	id: varchar('id', { length: 24 }).notNull().primaryKey().$defaultFn(createId),
	category: varchar('category', {
		length: 32,
		enum: [
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
		]
	}).notNull(),
	amount: real('amount').notNull(),
	type: varchar('type', { length: 12, enum: ['Money', 'Credit card', 'Debit card', 'Pix'] }).notNull(),
	date: timestamp('date', { mode: 'date' }).notNull(),
	description: varchar('description', { length: 255 })
});
