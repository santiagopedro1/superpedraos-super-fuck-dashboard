<script lang="ts">
	import CardMov from '$lib/components/CardMov.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import * as Card from '$lib/components/ui/card/';
	import * as Table from '$lib/components/ui/table';

	import { currencyFormatter, nomeMes, isEntrada } from '$lib/utils';
	import type { ChartConfiguration } from 'chart.js';

	export let data: { mes: number; ano: number };
	export let transacoes: (Entrada | Saida)[];

	const entradas = transacoes.filter(isEntrada) as Entrada[];
	const saidas = transacoes.filter((t) => !isEntrada(t)) as Saida[];

	const saldo =
		entradas.reduce((acc, t) => acc + t.valor, 0) - saidas.reduce((acc, t) => acc + t.valor, 0);

	const totalSaidas = saidas.reduce((acc, t) => acc + t.valor, 0);
	const labels = saidas.map((t) => t.motivo);

	const backgroundColor = [
		'#274c77',
		'#6096ba',
		'#a3cef1',
		'#e7ecef',
		'#274c77',
		'#6096ba',
		'#a3cef1',
		'#e7ecef'
	];

	const config: ChartConfiguration = {
		type: 'doughnut',
		data: {
			labels,
			datasets: [
				{
					data: saidas.map((t) => (t.valor / totalSaidas) * 100),
					backgroundColor
				}
			]
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: (context) => {
							return `${((saidas[context.dataIndex].valor / totalSaidas) * 100).toFixed(2)}%`;
						}
					},
					displayColors: false
				}
			}
		}
	};
</script>

<div class="grid grid-cols-2 grid-rows-2 place-items-center gap-6">
	<CardMov
		title="Saldo de {nomeMes(data.mes)} de {data.ano}"
		{saldo}
		total={transacoes.length}
	/>
	<Card.Root class="row-span-2">
		<Card.Header>
			<Card.Title>Info saídas</Card.Title>
		</Card.Header>
		<Card.Content class="flex items-center justify-center gap-4">
			<Chart {config} />
			<Table.Root>
				<Table.Header>
					<Table.Row class="hover:bg-inherit">
						<Table.Head>Motivo</Table.Head>
						<Table.Head>Valor</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each saidas as t}
						<Table.Row>
							<Table.Cell>
								{t.motivo}
							</Table.Cell>
							<Table.Cell>{currencyFormatter(t.valor)}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
	<CardMov
		title="Saldo de {nomeMes(data.mes)} de {data.ano}"
		{saldo}
		total={transacoes.length}
	/>
</div>
