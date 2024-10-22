import { z } from 'zod';

export const form_schema = z.object({
	code: z.number().default(undefined as unknown as number),
	destination: z.enum(['caixa', 'banco']).default(undefined as unknown as 'caixa'),
	amount: z.number().default(undefined as unknown as number),
	date: z.date(),
	description: z.string().nullable()
});

export type FormSchema = typeof form_schema;
