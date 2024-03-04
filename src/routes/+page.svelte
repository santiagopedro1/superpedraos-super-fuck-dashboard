<script lang="ts">
	import CardSaldo from '$lib/components/CardSaldo.svelte';
	import CardMov from '$lib/components/CardMov.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import * as Card from '$lib/components/ui/card';

	import type { ChartConfiguration } from 'chart.js';

	const labels = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	];

	const config: ChartConfiguration = {
		type: 'line',
		data: {
			labels,
			datasets: [
				{
					label: 'Saldo total (R$)',
					data: [650, 590, 800, 810, 560, 550, 400, 600, 700, 800, 900, 1000],
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				}
			]
		},
		options: {
			plugins: {
				legend: {
					display: false
				}
			},
			interaction: {
				intersect: false,
				axis: 'x',
				mode: 'nearest'
			}
		}
	};
</script>

<main class="grid place-content-center place-items-center gap-12">
	<div class="grid grid-cols-3 grid-rows-1 gap-12">
		<CardSaldo />
		<CardMov
			title="Entradas"
			saldo={50}
		/>
		<CardMov
			title="Saídas"
			saldo={-50}
		/>
	</div>

	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Saldo total durante o ano</Card.Title>
		</Card.Header>
		<Card.Content>
			<Chart {config} />
		</Card.Content>
	</Card.Root>
</main>
