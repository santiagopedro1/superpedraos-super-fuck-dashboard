import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const vendedores = sqliteTable('vendedores', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	nome: text('nome').notNull()
});

export const entrada = sqliteTable('entrada', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	valor: real('valor').notNull(),
	destino: text('destino', { enum: ['caixa', 'banco'] }).notNull(),
	data: integer('data', { mode: 'timestamp' }).notNull(),
	vendedor_id: integer('vendedor_id')
		.references(() => vendedores.id)
		.notNull()
});

export const saida = sqliteTable('saida', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	valor: real('valor').notNull(),
	motivo: text('motivo').notNull(),
	origem: text('origem', { enum: ['caixa', 'banco'] }).notNull(),
	data: integer('data', { mode: 'timestamp' }).notNull()
});
