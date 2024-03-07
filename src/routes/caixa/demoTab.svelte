<script lang="ts">
	import * as Card from '$lib/components/ui/card/';
	import * as Table from '$lib/components/ui/table';

	import { VisSingleContainer, VisTooltip, VisDonut } from '@unovis/svelte';
	import { Donut } from '@unovis/ts';

	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	import { currencyFormatter, nomeMes, isEntrada } from '$lib/utils';

	export let data: { mes: number; ano: number };
	export let transacoes: (Entrada | Saida)[];

	const saidas = transacoes.filter((t) => !isEntrada(t)) as Saida[];

	let totalEntradas = 0,
		totalSaidas = 0,
		totalCaixa = 0,
		totalBanco = 0;

	transacoes.forEach((t) => {
		if (isEntrada(t)) {
			totalEntradas += t.valor;
			t.destino === 'caixa' ? (totalCaixa += t.valor) : (totalBanco += t.valor);
		} else {
			totalSaidas += t.valor;
			t.origem === 'caixa' ? (totalCaixa -= t.valor) : (totalBanco -= t.valor);
		}
	});

	const saldo = totalEntradas - totalSaidas;

	const labels = saidas.map((t) => t.motivo);

	const backgroundColor = [
		'#264653',
		'#2a9d8f',
		'#e9c46a',
		'#f4a261',
		'#e76f51',
		'#264653',
		'#2a9d8f',
		'#e9c46a',
		'#f4a261',
		'#e76f51'
	];

	const triggers = {
		[Donut.selectors.segment]: (d: { data: number; index: number }) =>
			`<span class="font-bold">${labels[d.index]}</span><br> ${d.data}%`
	};
	const value = (d: number) => d;
	const color = (d: number, i: number) => backgroundColor[i];
</script>

<div class="grid grid-cols-3 place-items-center gap-6">
	<!-- Saldo total -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Saldo de {nomeMes(data.mes)}/{data.ano}</Card.Title>
		</Card.Header>
		<Card.Content class="flex gap-6">
			<div
				class="flex items-center rounded-full p-6 text-white {saldo > 0
					? 'bg-green-500'
					: 'bg-red-500'}"
			>
				{#if saldo > 0}
					<ArrowUp size="48" />
				{:else}
					<ArrowDown size="48" />
				{/if}
			</div>
			<div>
				<p
					class="text-center text-2xl font-bold uppercase {saldo > 0
						? 'text-green-500'
						: 'text-red-500'}"
				>
					{currencyFormatter(saldo)}
				</p>
				<p class="text-lg">Total de entradas: {currencyFormatter(totalEntradas)}</p>
				<p class="text-lg">Total de saídas: {currencyFormatter(totalSaidas)}</p>
			</div>
		</Card.Content>
	</Card.Root>
	<!-- Saldo Caixa -->
	<Card.Root class="w-fit">
		<Card.Header>
			<Card.Title>Saldo do caixa</Card.Title>
		</Card.Header>
		<Card.Content>
			<p
				class="text-center text-4xl font-bold uppercase {totalCaixa > 0
					? 'text-green-500'
					: 'text-red-500'}"
			>
				{currencyFormatter(totalCaixa)}
			</p>
		</Card.Content>
	</Card.Root>
	<!-- Saldo Banco -->
	<Card.Root class="w-fit">
		<Card.Header>
			<Card.Title>Saldo do banco</Card.Title>
		</Card.Header>
		<Card.Content>
			<p
				class="text-center text-4xl font-bold uppercase {totalBanco > 0
					? 'text-green-500'
					: 'text-red-500'}"
			>
				{currencyFormatter(totalBanco)}
			</p>
		</Card.Content>
	</Card.Root>

	<!-- Gráfico -->
	<Card.Root class="col-span-3 w-full">
		<Card.Header>
			<Card.Title>Relação de saídas</Card.Title>
		</Card.Header>
		<Card.Content class="flex items-center justify-center gap-6">
			<VisSingleContainer
				data={saidas.map((t) => ((t.valor / totalSaidas) * 100).toFixed(2))}
				class="h-96"
			>
				<VisTooltip {triggers} />
				<VisDonut
					{value}
					arcWidth={50}
					{color}
					centralLabel="Distribuição de motivos de saídas"
					centralSubLabel="em relação ao total de saídas"
				/>
			</VisSingleContainer>
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
</div>

<style>
	:root {
		--vis-tooltip-background-color: hsl(240 3.7 15.9);
		--vis-tooltip-border-color: hsl(240 3.7 15.9);
		--vis-tooltip-text-color: hsl(0 0 98);
	}
</style>
