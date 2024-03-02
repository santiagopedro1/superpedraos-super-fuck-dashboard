import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const partes = sqliteTable('partes', {
	id: integer('parte_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	nome: text('nome').notNull()
});

export const transacoes = sqliteTable('transacoes', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	tipo: text('tipo', { enum: ['entrada', 'saída'] }).notNull(),
	valor: real('valor').notNull(),
	data: integer('data', { mode: 'timestamp' }).notNull(),
	motivo: text('motivo').notNull(),
	dinheiro: integer('dinheiro', { mode: 'boolean' }).notNull(),
	parte_id: integer('parte_id')
		.references(() => partes.id)
		.notNull()
});
