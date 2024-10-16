<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { currencyFormatter } from '$lib';
	import type { Transaction } from '$lib/db/schema';

	const { transactions }: { transactions: Array<Transaction> } = $props();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row class="hover:bg-inherit">
			<Table.Head class="w-9">Código</Table.Head>
			<Table.Head>Valor</Table.Head>
			<Table.Head>Data</Table.Head>
			<Table.Head>Destino</Table.Head>
			<Table.Head>Descrição</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each transactions as { id, code, date, amount, description, destination, sales_rep_id } (id)}
			<Table.Row>
				<Table.Cell>{code}</Table.Cell>
				<Table.Cell class="w-32 font-medium">{currencyFormatter(amount)}</Table.Cell>
				<Table.Cell class="w-24">{date.toLocaleDateString('pt-BR')}</Table.Cell>
				<Table.Cell class="w-24 capitalize">{destination}</Table.Cell>
				<Table.Cell>{description || sales_rep_id || '-'}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
