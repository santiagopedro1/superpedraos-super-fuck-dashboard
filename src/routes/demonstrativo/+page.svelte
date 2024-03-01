<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select';
	import type { ActionData } from './$types';

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
	export let form: ActionData;

	let mesSelecionado: number, anoSelecionado: number;

	console.log(form);
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

<div class="mt-8 px-12">
	{#if form}
		{#if form.success}
			<p>Você escolheu {mesesOpt[form.data.mes - 1].label} de {form.data.ano}</p>
		{:else}
			<p>{form.error}</p>
		{/if}
	{:else}
		<p>Escolha um mês e um ano</p>
	{/if}
</div>
