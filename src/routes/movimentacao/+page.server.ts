import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const f = await request.formData();
		console.log(f.get('mes'), f.get('ano'));
	}
} satisfies Actions;
