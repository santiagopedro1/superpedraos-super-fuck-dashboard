<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	import DatePicker from '$lib/components/date-picker.svelte';
	import Relatorio from '$lib/components/relatorio.svelte';

	import { getLocalTimeZone } from '@internationalized/date';

	import { dateToCalendarDate } from '$lib';

	import type { Transaction } from '$lib/db/schema';
	import { Circle2 } from 'svelte-loading-spinners';

	const { data } = $props();

	let selected_range = $state(
		data.period
			? { start: dateToCalendarDate(data.period.start), end: dateToCalendarDate(data.period.end) }
			: undefined
	);

	let transactions_promise: Promise<Array<Transaction>> | undefined = $state();

	async function onsubmit() {
		const base_api_url = 'transactions/get';
		const params = new URLSearchParams({
			start: selected_range!.start.toDate(getLocalTimeZone()).toLocaleDateString('pt-BR'),
			end: selected_range!.end.toDate(getLocalTimeZone()).toLocaleDateString('pt-BR')
		});

		const api_url = base_api_url + '?' + params.toString();

		transactions_promise = fetch(api_url).then((response) => response.json());
	}
</script>

<div class="flex justify-center">
	<div>
		<form
			{onsubmit}
			class="flex justify-center gap-16"
		>
			<DatePicker
				bind:selected_range
				range
			/>

			<input
				type="hidden"
				name="period"
				value={selected_range?.start?.toDate(getLocalTimeZone()).toLocaleDateString('pt-BR') +
					'-' +
					selected_range?.end?.toDate(getLocalTimeZone()).toLocaleDateString('pt-BR')}
			/>
			<div class="flex gap-3">
				<Button
					variant="outline"
					class="self-center"
					onclick={() => (selected_range = undefined)}
				>
					Clear
				</Button>
				<Button
					type="submit"
					class="self-center"
				>
					Generate report
				</Button>
			</div>
		</form>
	</div>
</div>

{#if transactions_promise}
	{#await transactions_promise}
		<div class="flex justify-center">
			<Circle2
				size="200"
				colorOuter="#7C3AED"
				colorCenter="#458588"
				colorInner="#D79921"
			/>
		</div>
	{:then transactions}
		{@const fixed_transactions = transactions.map((transaction) => ({
			...transaction,
			date: new Date(transaction.date)
		}))}
		<Relatorio transactions={fixed_transactions} />
	{:catch error}
		<p class="text-destructive text-center text-xl">{error}</p>
	{/await}
{/if}
