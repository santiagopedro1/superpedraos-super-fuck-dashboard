<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import AddMovDialog from '$lib/components/AddMovDialog.svelte';

	import type { Selected } from 'bits-ui';

	import { enhance } from '$app/forms';
	import { today } from '@internationalized/date';

	const hoje = today('America/Sao_Paulo');
	const { year, month } = hoje;

	const meses = [
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
	];

	const anos = [2023, 2024];

	let anoSelecionado: Selected<number> | undefined;
	let mesSelecionado: Selected<string> | undefined;
</script>

<div>
	<form
		method="POST"
		action="?/mesAno"
		class="flex items-center justify-center gap-8"
		use:enhance
	>
		<Select.Root
			selected={anoSelecionado}
			onSelectedChange={(v) => {
				v ? (anoSelecionado = v) : v;
				if (anoSelecionado?.value === year) {
					if (mesSelecionado) {
						mesSelecionado.label = meses[month - 1];
						mesSelecionado.value = meses[month - 1];
					}
				}
			}}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Selecione um ano" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Ano</Select.Label>
					{#each anos as ano}
						<Select.Item
							value={ano}
							label={ano.toString()}
						/>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="ano" />
		</Select.Root>
		<Select.Root
			disabled={anoSelecionado === undefined ? true : false}
			selected={mesSelecionado}
			onSelectedChange={(v) => (v ? (mesSelecionado = v) : v)}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Selecione um mês" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Mês</Select.Label>
					{#each meses as mes, index (index)}
						{#if anoSelecionado?.value === year ? index <= month - 1 : true}
							<Select.Item
								value={mes}
								label={mes}
							/>
						{/if}
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="mes" />
		</Select.Root>
		<Button type="submit">Vai</Button>
	</form>
</div>

<AddMovDialog />
