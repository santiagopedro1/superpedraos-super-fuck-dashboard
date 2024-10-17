<script lang="ts">
	import TransactionTable from '$lib/components/transaction-table.svelte';

	let { data } = $props();
</script>

{#await data.all_transactions}
	Loading
{:then transactions}
	<TransactionTable {transactions} />
{:catch error}
	<p>error: {error.message}</p>
{/await}
