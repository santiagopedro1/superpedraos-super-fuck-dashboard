<script lang="ts">
	import TransactionTypeChart from '$lib/components/TransactionTypeChart.svelte';
	const { data } = $props();
	const { moneyCount, creditCardCount, debitCardCount, pixCount } = data.sumsAndCounts;
</script>

<TransactionTypeChart
	{moneyCount}
	{creditCardCount}
	{debitCardCount}
	{pixCount}
/>
