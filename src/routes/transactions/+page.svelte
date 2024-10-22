<script lang="ts">
	import TransactionTable from '$lib/components/transaction-table.svelte';
	import TransactionForm from '$lib/components/transaction-form.svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	import { Circle2 } from 'svelte-loading-spinners';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	const { super_form } = data;
</script>

<div class="flex flex-col items-center gap-4">
	{#await data.all_transactions}
		<Circle2
			size="200"
			colorOuter="#7C3AED"
			colorCenter="#458588"
			colorInner="#D79921"
		/>
	{:then transactions}
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>
					<Plus />
					Add a transaction
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Add a Transaction</Dialog.Title>
				</Dialog.Header>
				<TransactionForm {super_form} />
			</Dialog.Content>
		</Dialog.Root>

		<TransactionTable
			{transactions}
			interactive
		/>
	{:catch error}
		<p>error: {error.message}</p>
	{/await}
</div>
