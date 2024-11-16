import { z } from 'zod';

export const new_transaction_schema = z.object({
	code: z.number().default(undefined as unknown as number),
	destination: z.enum(['caixa', 'banco']).default(undefined as unknown as 'caixa'),
	amount: z.number().default(undefined as unknown as number),
	date: z.date(),
	description: z.string().nullable()
});

export const edit_transaction_schema = z.object({
	id: z.string(),
	code: z.number().default(undefined as unknown as number),
	destination: z.enum(['caixa', 'banco']).default(undefined as unknown as 'caixa'),
	amount: z.number().default(undefined as unknown as number),
	date: z.date(),
	description: z.string().nullable()
});

export type NewTransactionSchema = typeof new_transaction_schema;
export type EditTransactionSchema = typeof edit_transaction_schema;
