<script lang="ts">
	import { currencyFormatter } from '$lib';
	import * as Card from '$lib/components/ui/card';

	const { data } = $props();
</script>

<div class="grid grid-cols-3 gap-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>Total em caixa</Card.Title>
			<Card.Description>Total em caixa</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-extrabold">
				{currencyFormatter(data.sum_in_cash - data.sum_out_cash)}
			</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Total no banco</Card.Title>
			<Card.Description>Total no banco</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-extrabold">
				{currencyFormatter(data.sum_in_bank - data.sum_out_bank)}
			</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Total total</Card.Title>
			<Card.Description>Total total em ambos caixa e banco</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-extrabold">
				{currencyFormatter(
					data.sum_in_bank + data.sum_in_cash - (data.sum_out_bank + data.sum_out_cash)
				)}
			</p>
		</Card.Content>
	</Card.Root>
</div>
