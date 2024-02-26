<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import { currencyFormatter } from '$lib/utils';
	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	export let saldo = 150;
	export let total = 15;
	const tipo = saldo > 0 ? 'entradas' : 'saidas';
</script>

<Card class="flex flex-row items-center gap-4 bg-neutral-100 px-6">
	<div
		class="flex items-center rounded-full p-6 {tipo === 'entradas' ? 'bg-green-500' : 'bg-red-500'}"
	>
		{#if tipo === 'entradas'}
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
				<h2 class="capitalize">{tipo}</h2>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-2xl font-bold {tipo === 'entradas' ? 'text-green-500' : 'text-red-500'}">
				{currencyFormatter(saldo)}
			</p>
		</CardContent>
		<CardFooter class="flex gap-4">
			<p>Total de {total}</p>
		</CardFooter>
	</div>
</Card>
