import { z } from 'zod';

export const formSchema = z.object({
	query: z.object(
		{
			start: z.date(),
			end: z.date()
		},
		{ message: 'Data inválida' }
	)
});

export type FormSchema = typeof formSchema;
