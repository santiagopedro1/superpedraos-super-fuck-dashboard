<script lang="ts">
	import { currencyFormatter } from '$lib';
	import type { Transaction } from '$lib/db/schema';

	import * as Card from '$lib/components/ui/card';
	import TransactionTable from './transaction-table.svelte';

	const { transactions }: { transactions: Array<Transaction> } = $props();

	let total_saidas = $state(0);
	let total_entradas = $state(0);

	let total = $derived(total_entradas - total_saidas);

	for (const transaction of transactions) {
		if (transaction.code === 1) {
			total_entradas += transaction.amount;
		} else {
			total_saidas += transaction.amount;
		}
	}
</script>

<div class="grid grid-cols-3 gap-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>total balance</Card.Title>
			<Card.Description>Total balance for the period</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-xl font-extrabold {total > 0 ? 'text-primary' : 'text-destructive'}">
				{currencyFormatter(total)}
			</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>total income</Card.Title>
			<Card.Description>Total of incoming transactions for the period</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-xl font-extrabold text-green-500">{currencyFormatter(total_entradas)}</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>total expenses</Card.Title>
			<Card.Description>Total of outgoing transactions for the period</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-xl font-extrabold text-red-500">{currencyFormatter(total_saidas)}</p>
		</Card.Content>
	</Card.Root>
</div>

<Card.Root>
	<Card.Header>
		<Card.Title>All transactions</Card.Title>
		<Card.Description>{transactions.length} transactions</Card.Description>
	</Card.Header>
	<Card.Content>
		<TransactionTable {transactions} />
	</Card.Content>
</Card.Root>
