<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';

	import CardMov from '$lib/components/CardMov.svelte';

	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	import { currencyFormatter, dateFormatter, isEntrada } from '$lib/utils';

	const mesesOpt = [
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
	].map((month, i) => ({ value: i + 1, label: month }));

	const anosOpt = [2023, 2024].map((year) => ({ value: year, label: String(year) }));
	const headers = ['nome', 'tipo', 'valor', 'data', 'origem/destino'];

	export let form: ActionData;
	export let data: PageServerData;

	let mesSelecionado: number, anoSelecionado: number;
</script>

<div>
	<form
		method="POST"
		action="?/mesAno"
		class="flex items-center justify-center gap-8"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<Select.Root
			selected={mesSelecionado
				? mesesOpt.find((m) => m.value === mesSelecionado)
				: mesesOpt.find((m) => m.value === data.mesHoje)}
			items={mesesOpt}
			onSelectedChange={(v) => (v ? (mesSelecionado = v.value) : undefined)}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Selecione um mês" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Mês</Select.Label>
					{#each mesesOpt as mes}
						<Select.Item
							value={mes.value}
							label={mes.label}
						/>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="mes" />
		</Select.Root>
		<Select.Root
			items={anosOpt}
			selected={anoSelecionado
				? anosOpt.find((m) => m.value === anoSelecionado)
				: anosOpt.find((m) => m.value === data.anoHoje)}
			onSelectedChange={(v) => {
				v ? (anoSelecionado = v.value) : undefined;
			}}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Selecione um ano" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Ano</Select.Label>
					{#each anosOpt as ano}
						<Select.Item
							value={ano.value}
							label={ano.label}
						/>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="ano" />
		</Select.Root>
		<Button type="submit">Vai</Button>
	</form>
</div>

<div class="mt-12 grid place-items-center gap-6 text-xl">
	{#if form}
		{#if form.ok}
			<CardMov
				title="Saldo de {mesesOpt[form.data.mes - 1].label} de {form.data.ano}"
				saldo={form.saldo}
				total={form.transacoes?.length}
			/>

			<h2>Transações de {mesesOpt[form.data.mes - 1].label} de {form.data.ano}</h2>
			<Table.Root class="mx-auto max-w-4xl">
				<Table.Header>
					<Table.Row class="hover:bg-inherit">
						{#each headers as header}
							<Table.Head class="capitalize">{header}</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if form.transacoes}
						{#each form.transacoes as transacao}
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
					{/if}
				</Table.Body>
			</Table.Root>
		{:else}
			<p>{form.error}</p>
		{/if}
	{:else}
		<p>Escolha um mês e um ano</p>
	{/if}
</div>
