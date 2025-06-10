import { int, mysqlTable, real, varchar, timestamp } from 'drizzle-orm/mysql-core';

import { createId } from '@paralleldrive/cuid2';

export const transaction = mysqlTable('transaction', {
	id: varchar('id', { length: 24 }).notNull().primaryKey().$defaultFn(createId),
	code: int('code').notNull(),
	amount: real('amount').notNull(),
	type: varchar('type', { length: 12, enum: ['money', 'credit-card', 'debit-card', 'pix'] }).notNull(),
	date: timestamp('date', { mode: 'date' }).notNull(),
	description: varchar('description', { length: 255 })
});
