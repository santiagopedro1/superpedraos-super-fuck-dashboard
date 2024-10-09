import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { createId } from '@paralleldrive/cuid2';

export const sales_rep = sqliteTable('vendedor', {
	id: text().primaryKey().$defaultFn(createId),
	nome: text('nome').notNull()
});

export const transaction = sqliteTable('transacao', {
	id: text().primaryKey().$defaultFn(createId),
	code: int('codigo').notNull(),
	amount: real('valor').notNull(),
	destination: text('destino', { enum: ['caixa', 'banco'] }).notNull(),
	date: int('data', { mode: 'timestamp_ms' }).notNull(),
	description: text('descricao'),
	sales_rep_id: text('vendedor_id').references(() => sales_rep.id)
});
