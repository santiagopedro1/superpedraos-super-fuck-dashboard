<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select';
	import type { ActionData, PageServerData } from './$types';

	import { currencyFormatter, dateFormatter } from '$lib/utils';

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
	const headers = ['nome', 'tipo', 'valor', 'data', 'motivo'];

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
		<Button type="submit">Vai</Button>
	</form>
</div>

<div class="mt-12 grid place-items-center text-xl">
	{#if form}
		{#if form.ok}
			<table>
				<thead class="border-b-2 border-primary">
					<tr>
						{#each headers as header}
							<th class="px-4 py-2 text-center font-bold capitalize">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#if form.transacoes}
						{#each form.transacoes as transacao}
							<tr class="border-b-2 border-slate-800 border-opacity-50 py-4 hover:bg-slate-300">
								<td class="px-12 py-5 text-center">{transacao.partes?.nome}</td>
								<td class="px-12 py-5 text-center capitalize">{transacao.transacoes.tipo}</td>
								<td class="px-12 py-5 text-center"
									>{currencyFormatter(transacao.transacoes.valor)}</td
								>
								<td class="px-12 py-5 text-center">{dateFormatter(transacao.transacoes.data)}</td>
								<td class="px-12 py-5 text-center">{transacao.transacoes.motivo}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		{:else}
			<p>{form.error}</p>
		{/if}
	{:else}
		<p>Escolha um mês e um ano</p>
	{/if}
</div>
