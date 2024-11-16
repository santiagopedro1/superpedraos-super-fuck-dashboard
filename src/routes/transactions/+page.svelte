<script lang="ts">
	import TransactionTable from '$lib/components/transaction-table.svelte';

	import { Button } from '$lib/components/ui/button';

	import { Circle2 } from 'svelte-loading-spinners';

	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();

	const { edit_transaction_form } = data;
</script>

<div class="flex flex-col items-center gap-4">
	<Button
		href="/transactions/new"
		class="gap-2"
	>
		Add a Transaction
		<ArrowRight />
	</Button>

	{#await data.all_transactions}
		<Circle2
			size="200"
			colorOuter="#7C3AED"
			colorCenter="#458588"
			colorInner="#D79921"
		/>
	{:then transactions}
		<TransactionTable
			{transactions}
			interactive
			{edit_transaction_form}
		/>
	{:catch error}
		<p>error: {error.message}</p>
	{/await}
</div>
