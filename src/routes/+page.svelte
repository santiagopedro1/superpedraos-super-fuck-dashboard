<script lang="ts">
	import CardSaldo from '$lib/components/CardSaldo.svelte';
	import CardMov from '$lib/components/CardMov.svelte';
</script>

<main>
	<div class="grid grid-cols-3 grid-rows-1 gap-8">
		<CardSaldo />
		<CardMov
			title="Entradas"
			saldo={50}
		/>
		<CardMov
			title="Saídas"
			saldo={-50}
		/>
	</div>
</main>
