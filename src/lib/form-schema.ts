import { z } from 'zod';

export const formSchema = z.object({
	period: z.object(
		{
			start: z.date(),
			end: z.date()
		},
		{ message: 'Invalid period' }
	)
});

export type FormSchema = typeof formSchema;
