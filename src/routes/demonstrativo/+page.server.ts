import { error, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { today } from '@internationalized/date';

const hoje = today('America/Sao_Paulo');
const { year, month } = hoje;

export const load: PageServerLoad = async ({ url }) => {
	// check if there is a query for mes and ano
	// const { searchParams } = new URL(url);
	// const mes = searchParams.get('mes');
	// const ano = searchParams.get('ano');
	// // if there is no query, add today's date to the url searchParams and redirect
	// if (!mes || !ano) {
	// 	const search = new URLSearchParams({ mes: month.toString(), ano: year.toString() });
	// 	return redirect(302, `${url.pathname}?${search}`);
	// }
};

export const actions = {
	mesAno: async ({ request }) => {
		const f = await request.formData();
		console.log(f);

		if (f.has('mes') && f.has('ano')) {
			const mes = Number(f.get('mes'));
			const ano = Number(f.get('ano'));

			if (ano > year || (ano === year && mes > month))
				return { success: false, data: { mes, ano }, error: 'Data futura' };

			return { success: true, data: { mes, ano } };
		}
	}
} satisfies Actions;
