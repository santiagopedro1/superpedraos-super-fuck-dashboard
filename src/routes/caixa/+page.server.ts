import type { Actions, PageServerLoad } from './$types';
import { today } from '@internationalized/date';

import { db } from '$lib/db/database';
import { gte, lte, eq, asc, and } from 'drizzle-orm';
import { vendedores, entrada, saida } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
	const hoje = today('America/Sao_Paulo');
	const { year, month } = hoje;
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

			const entradas = await db
				.select({
					id: entrada.id,
					valor: entrada.valor,
					destino: entrada.destino,
					data: entrada.data,
					vendedor: vendedores.nome
				})
				.from(entrada)
				.innerJoin(vendedores, eq(entrada.vendedor_id, vendedores.id))
				.where(and(gte(entrada.data, start), lte(entrada.data, end)));

			const saidas = await db
				.select({
					id: saida.id,
					valor: saida.valor,
					motivo: saida.motivo,
					origem: saida.origem,
					data: saida.data
				})
				.from(saida)
				.where(and(gte(saida.data, start), lte(saida.data, end)));

			const transacoes = [...entradas, ...saidas];

			if (transacoes.length) {
				transacoes.sort((a, b) => a.data.getTime() - b.data.getTime());

				let saldo = 0;
				transacoes.forEach((t) => {
					if ('destino' in t) {
						saldo += t.valor;
					} else {
						saldo -= t.valor;
					}
				});

				return {
					ok: true,
					transacoes,
					saldo,
					data: { mes, ano }
				};
			} else
				return {
					ok: false,
					error: 'Nenhuma transação encontrada para a data fornecida.',
					data: {
						mes,
						ano
					}
				};
		}
	}
} satisfies Actions;
