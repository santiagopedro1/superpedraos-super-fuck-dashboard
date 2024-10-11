import { z } from 'zod';

export const formSchema = z.object({
	type: z.object({
		value: z.string()
	}),
	query: z.date({ message: 'Escolha uma data.' })
});

export type FormSchema = typeof formSchema;
