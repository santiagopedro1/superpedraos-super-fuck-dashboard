<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import { currencyFormatter } from '$lib/utils';
	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	export let saldo = 150;
	export let total = 15;
	export let title: string;

	const tipo = saldo > 0 ? 'up' : 'down';
</script>

<Card class="flex flex-row items-center gap-4 bg-neutral-100 px-6">
	<div class="flex items-center rounded-full p-6 {tipo === 'up' ? 'bg-green-500' : 'bg-red-500'}">
		{#if tipo === 'up'}
			<ArrowUp
				size="48"
				color="white"
			/>
		{:else}
			<ArrowDown
				size="48"
				color="white"
			/>
		{/if}
	</div>
	<div>
		<CardHeader class="flex flex-row items-center justify-between">
			<CardTitle>
				<h2>{title}</h2>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-2xl font-bold {tipo === 'up' ? 'text-green-500' : 'text-red-500'}">
				{currencyFormatter(saldo)}
			</p>
		</CardContent>
		<CardFooter class="flex gap-4">
			<p>Total de {total}</p>
		</CardFooter>
	</div>
</Card>
