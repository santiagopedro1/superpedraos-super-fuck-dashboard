<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';
	import { currencyFormatter } from '$lib/utils';

	export let saldo = 150;

	function updateSaldo(novo: number) {
		saldo = novo;
	}
</script>

<Card class="bg-neutral-100">
	<CardHeader>
		<CardTitle>
			<div class="flex justify-between">
				<h2>Saldo total</h2>
				<p>$</p>
			</div>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<p class="text-2xl">
			{currencyFormatter(saldo)}
		</p>
	</CardContent>
	<CardFooter class="flex gap-4">
		<Switch
			id="somenteDinheiro"
			onCheckedChange={(c) => (c ? updateSaldo(123) : updateSaldo(150))}
		/>
		<label for="somenteDinheiro">Mostrar somente dinheiro</label>
	</CardFooter>
</Card>
