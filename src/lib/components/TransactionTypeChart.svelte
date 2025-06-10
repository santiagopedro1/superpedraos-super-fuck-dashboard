<script lang="ts">
	import { PieChart } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart';
	import * as Card from '$lib/components/ui/card';

	const { moneyCount, creditCardCount, debitCardCount, pixCount } = $props();

	const chartData = [
		{ type: 'money', count: moneyCount, color: 'var(--chart-1)' },
		{ type: 'credit card', count: creditCardCount, color: 'var(--chart-2)' },
		{ type: 'debit card', count: debitCardCount, color: 'var(--chart-3)' },
		{ type: 'pix', count: pixCount, color: 'var(--chart-4)' }
	];
	const chartConfig = {
		count: { label: 'Count' },
		money: { label: 'Money' },
		'credit card': { label: 'Credit Card' },
		'debit card': { label: 'Debit Card' },
		pix: { label: 'Pix' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Number of transactions by type</Card.Title>
		<Card.Description>All time</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container
			config={chartConfig}
			class="mx-auto aspect-square max-h-[250px]"
		>
			<PieChart
				data={chartData}
				key="type"
				value="count"
				label={(d) =>
					d.type
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				cRange={chartData.map((d) => d.color)}
				props={{
					pie: {
						motion: 'tween'
					}
				}}
				legend
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="text-muted-foreground leading-none">
			Total: {debitCardCount + creditCardCount + moneyCount + pixCount}
		</div>
	</Card.Footer>
</Card.Root>
