<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import TransacoesTab from './transacoesTab.svelte';
	import DemoTab from './demoTab.svelte';

	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	import { Meses } from '$lib/utils';

	const mesesOpt = Meses.map((month, i) => ({ value: i + 1, label: month }));

	const anosOpt = [2023, 2024].map((year) => ({ value: year, label: String(year) }));

	export let form: ActionData;
	export let data: PageServerData;

	let mesSelecionado: number,
		anoSelecionado: number,
		loading = false;
</script>

<main>
	<form
		method="POST"
		action="?/mesAno"
		class="flex items-center justify-center gap-8"
		use:enhance={() => {
			loading = true;
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

	<div class="mt-12">
		{#if form}
			{#if form.ok && form.transacoes}
				<Tabs.Root
					value="transacoes"
					class="grid place-items-center gap-4"
				>
					<Tabs.List>
						<Tabs.Trigger value="transacoes">Transações</Tabs.Trigger>
						<Tabs.Trigger value="demo">Demonstrativo</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="transacoes">
						<TransacoesTab
							transacoes={form.transacoes}
							data={form.data}
						/>
					</Tabs.Content>
					<Tabs.Content value="demo">
						<DemoTab
							transacoes={form.transacoes}
							data={form.data}
						/>
					</Tabs.Content>
				</Tabs.Root>
			{:else}
				<p>{form.error}</p>
			{/if}
		{:else if loading}
			<svg
				fill="none"
				class="mx-auto h-24 w-24 animate-spin stroke-2"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					clip-rule="evenodd"
					d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
					fill="currentColor"
					fill-rule="evenodd"
				/>
			</svg>
		{:else}
			<p>Escolha um mês e um ano</p>
		{/if}
	</div>
</main>
