<script lang="ts">
	import TransactionForm from '$lib/forms/add-transaction-form.svelte';

	let { data } = $props();
</script>

<div class="flex flex-col items-center gap-4">
	<TransactionForm super_form={data.new_transaction_form} />
</div>
