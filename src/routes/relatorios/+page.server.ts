import type { Actions, PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { formSchema } from '$lib/form-schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;

		switch (data.type.value) {
			case 'single':
				return {
					form,
					data: {
						message: 'Deu certo'
					}
				};
			case 'month':
				return fail(400, {
					form
				});
			case 'year':
				return fail(400, {
					form
				});
		}
	}
};
