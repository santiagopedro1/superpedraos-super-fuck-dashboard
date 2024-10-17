import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { createId } from '@paralleldrive/cuid2';
import type { InferSelectModel } from 'drizzle-orm';

export const transaction = sqliteTable('transacao', {
	id: text().primaryKey().$defaultFn(createId),
	code: int('codigo').notNull(),
	amount: real('valor').notNull(),
	destination: text('destino', { enum: ['caixa', 'banco'] }).notNull(),
	date: int('data', { mode: 'timestamp_ms' }).notNull(),
	description: text('descricao')
});

export type Transaction = InferSelectModel<typeof transaction>;
