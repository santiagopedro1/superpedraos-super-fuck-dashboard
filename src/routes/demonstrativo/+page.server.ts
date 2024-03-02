import type { Actions, PageServerLoad } from './$types';
import { today } from '@internationalized/date';

import { db } from '$lib/db/database';
import { gte, lte, and } from 'drizzle-orm';

const hoje = today('America/Sao_Paulo');
const { year, month } = hoje;

export const load: PageServerLoad = async () => {
	return { mesHoje: month, anoHoje: year };
};

export const actions = {
	mesAno: async ({ request }) => {
		const f = await request.formData();

		if (f.has('mes') && f.has('ano')) {
			const mes = Number(f.get('mes'));
			const ano = Number(f.get('ano'));

			const start = new Date(ano, mes - 1, 1);
			const end = new Date(ano, mes, 0);

			const res = await db.query.transacoes.findMany({
				where: (t) => and(gte(t.data, start), lte(t.data, end))
			});

			if (res.length)
				return {
					ok: true,
					transacoes: res
				};
			else
				return {
					ok: false,
					error: 'Nenhuma transação encontrada'
				};
		}
	}
} satisfies Actions;
