import type { Actions, PageServerLoad } from './$types';
import { today } from '@internationalized/date';

import { db } from '$lib/db/database';
import { gte, lte, eq, asc, and } from 'drizzle-orm';
import { partes, transacoes } from '$lib/db/schema';

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

			const res = await db
				.select()
				.from(transacoes)
				.where(and(gte(transacoes.data, start), lte(transacoes.data, end)))
				.leftJoin(partes, eq(transacoes.parte_id, partes.id))
				.orderBy(asc(transacoes.data));

			let saldo = 0;
			res.forEach((t) => {
				if (t.transacoes.tipo === 'entrada') saldo += t.transacoes.valor;
				else saldo -= t.transacoes.valor;
			});

			if (res.length)
				return {
					ok: true,
					data: {
						mes,
						ano
					},
					transacoes: res,
					saldo
				};
			else
				return {
					ok: false,
					error: 'Nenhuma transação encontrada',
					data: {
						mes,
						ano
					}
				};
		}
	}
} satisfies Actions;
