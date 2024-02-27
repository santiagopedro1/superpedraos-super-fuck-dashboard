<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

	import CurrencyInput from '$lib/components/CurrencyInput.svelte';

	import { Plus } from 'lucide-svelte';

	import { enhance } from '$app/forms';

	let tab: string | undefined;

	const entradaOpt = ['Vendas', 'Recebimento Empréstimo'];

	const saidaOpt = [
		'Pagamento de Fornecedores',
		'Pagamento de Pessoal',
		'Pagamento de Pró-Labore',
		'Material de Escritório/Expediente',
		'Pagamento de água/luz/telefone/gasolina',
		'Pagamento de Terceiros',
		'Pagamento de Impostos',
		'Encargos Trabalhistas',
		'Aquisição de Bens',
		'Tarifas Bancárias',
		'Empréstimos',
		'Promoções e Propagandas'
	];
</script>

<div class="mt-8 flex justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button
				size="icon"
				class="rounded-full"
			>
				<Plus size="24" />
			</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Adicionar movimentação</Dialog.Title>
			</Dialog.Header>
			<form
				method="POST"
				action="?/addMov"
				use:enhance
				class="flex flex-col items-center gap-6"
			>
				<Tabs onValueChange={(v) => (tab = v)}>
					<TabsList>
						<TabsTrigger
							class="data-[state=active]:bg-green-500 data-[state=active]:text-white"
							value="entrada">Entrada</TabsTrigger
						>
						<TabsTrigger
							class="data-[state=active]:bg-red-500 data-[state=active]:text-white"
							value="saida">Saida</TabsTrigger
						>
						<input
							type="hidden"
							name="tipo"
							bind:value={tab}
						/>
					</TabsList>
				</Tabs>
				<CurrencyInput tipo={tab}>
					<p slot="leading">R$</p>
				</CurrencyInput>
				<Select.Root>
					<Select.Trigger class="max-w-96">
						<Select.Value placeholder="Motivo" />
					</Select.Trigger>
					<Select.Content collisionPadding={16}>
						<Select.Group>
							{#if tab === 'entrada'}
								{#each entradaOpt as opt}
									<Select.Item
										value={opt}
										label={opt}>{opt}</Select.Item
									>
								{/each}
							{:else}
								{#each saidaOpt as opt}
									<Select.Item
										value={opt}
										label={opt}>{opt}</Select.Item
									>
								{/each}
							{/if}
						</Select.Group>
					</Select.Content>
					<Select.Input name="motivo" />
				</Select.Root>
				<Dialog.Footer>
					<Button type="submit">OK</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>
