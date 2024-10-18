<script lang="ts">
	import TransactionTable from '$lib/components/transaction-table.svelte';
	import { Circle2 } from 'svelte-loading-spinners';

	let { data } = $props();

	$inspect(data.all_transactions);
</script>

{#await data.all_transactions}
	<div class="flex justify-center">
		<Circle2
			size="200"
			colorOuter="#7C3AED"
			colorCenter="#458588"
			colorInner="#D79921"
		/>
	</div>
{:then transactions}
	<TransactionTable
		{transactions}
		interactive
	/>
{:catch error}
	<p>error: {error.message}</p>
{/await}
