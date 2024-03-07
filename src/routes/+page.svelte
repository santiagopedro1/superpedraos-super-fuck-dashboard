<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { VisXYContainer, VisLine, VisAxis } from '@unovis/svelte';

	import { Meses } from '$lib/utils';

	type DataRecord = {
		xAxisValue: number;
		yAxisValue: number;
	};
	const data: DataRecord[] = Array.from({ length: 12 }, (_, i) => ({
		xAxisValue: i + 1,
		yAxisValue: Math.random() * 10000
	}));
	const tickFormat = (tick: number, i: number) => Meses[i];
	const x = (d: DataRecord) => d.xAxisValue;
	const y = (d: DataRecord) => d.yAxisValue;
</script>

<main class="space-y-8">
	<h1 class="text-center text-4xl">
		SUPERPEDRÃO'S <br />
		SUPER FUCK <br />
		DASHBOARD
	</h1>
	<Card.Root>
		<Card.Header>
			<Card.Title>Saldo total durante o ano</Card.Title>
			<Card.Description
				>Saldo total de entradas e saídas durante o ano. Fake obviamente</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<VisXYContainer {data}>
				<VisLine
					{x}
					{y}
				/>
				<VisAxis
					type="x"
					label="Mês"
					{tickFormat}
					numTicks={12}
					gridLine={false}
				/>
				<VisAxis
					type="y"
					label="Saldo"
				/>
			</VisXYContainer>
		</Card.Content>
	</Card.Root>
</main>

<style>
	:root {
		--vis-axis-grid-color: hsl(240 3.7 15.9);
	}
</style>
