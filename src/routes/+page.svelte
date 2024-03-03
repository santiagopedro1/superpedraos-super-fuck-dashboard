<script lang="ts">
	import CardSaldo from '$lib/components/CardSaldo.svelte';
	import CardMov from '$lib/components/CardMov.svelte';
</script>

<main>
	<div class="grid grid-cols-3 grid-rows-1 gap-8">
		<CardSaldo />
		<CardMov
			title="entradas"
			saldo={50}
		/>
		<CardMov
			title="saídas"
			saldo={-50}
		/>
	</div>
</main>
