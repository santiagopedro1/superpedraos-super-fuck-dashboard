<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';

	import { currencyFormatter } from '$lib';
	import { Button } from '$lib/components/ui/button';

	import { ArrowUpRight } from 'lucide-svelte';

	const { data } = $props();
</script>

<div class="grid grid-cols-4 gap-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>Uma coisa</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Certamente algo aqui</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>

<Card.Root>
	<Card.Header class="flex-row">
		<div class="space-y-2">
			<Card.Title>Transações</Card.Title>
			<Card.Description>Transações recentes.</Card.Description>
		</div>
		<Button
			href="/caixa"
			size="sm"
			class="ml-auto gap-1"
		>
			Ver Todas
			<ArrowUpRight class="h-4 w-4" />
		</Button>
	</Card.Header>
	<Card.Content>
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
				{#each data.latest_transactions as { id, code, date, amount, description, destination, sales_rep_id } (id)}
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
	</Card.Content>
</Card.Root>
