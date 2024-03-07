<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	import { currencyFormatter, dateFormatter, isEntrada, nomeMes } from '$lib/utils';

	const headers = ['nome', 'tipo', 'valor', 'data', 'origem/destino'];

	export let data: { mes: number; ano: number };
	export let transacoes: (Entrada | Saida)[];
</script>

<h2 class="text-center">
	Transações de {nomeMes(data.mes ? data.mes : 0)} de {data.ano}
</h2>
<Table.Root>
	<Table.Header>
		<Table.Row class="hover:bg-inherit">
			{#each headers as header}
				<Table.Head class="capitalize">{header}</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each transacoes as transacao}
			<Table.Row>
				<Table.Cell>
					{#if isEntrada(transacao)}
						{transacao.vendedor}
					{:else}
						{transacao.motivo}
					{/if}
				</Table.Cell>
				<Table.Cell>
					{#if isEntrada(transacao)}
						Entrada
					{:else}
						Saída
					{/if}
				</Table.Cell>
				<Table.Cell>{currencyFormatter(transacao.valor)}</Table.Cell>
				<Table.Cell>{dateFormatter(transacao.data)}</Table.Cell>
				<Table.Cell class="capitalize">
					{#if isEntrada(transacao)}
						{transacao.destino}
					{:else}
						{transacao.origem}
					{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
