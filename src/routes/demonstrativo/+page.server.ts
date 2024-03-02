import type { Actions, PageServerLoad } from './$types';
import { today } from '@internationalized/date';

const hoje = today('America/Sao_Paulo');
const { year, month } = hoje;

export const load: PageServerLoad = async () => {
	return { mesHoje: month, anoHoje: year };
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
