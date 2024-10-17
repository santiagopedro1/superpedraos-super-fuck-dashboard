<script lang="ts">
	import { currencyFormatter } from '$lib';

	import * as Card from '$lib/components/ui/card';

	import { DollarSign, Landmark, Wallet } from 'lucide-svelte';

	const { data } = $props();
</script>

<div class="grid grid-cols-3 gap-8">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title>cash register</Card.Title>
			<DollarSign class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-extrabold">
				{currencyFormatter(data.sum_in_cash - data.sum_out_cash)}
			</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title>bank balance</Card.Title>
			<Landmark class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-extrabold">
				{currencyFormatter(data.sum_in_bank - data.sum_out_bank)}
			</p>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title>total balance</Card.Title>
			<Wallet class="text-muted-foreground h-4 w-4" />
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
