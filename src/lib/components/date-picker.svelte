<script lang="ts">
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';

	import type { DateRange } from 'bits-ui';

	import { cn } from '$lib/utils';

	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	let { value = $bindable() }: { value: DateRange | undefined } = $props();
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-sm justify-start pl-4 text-left font-normal',
			!value && 'text-muted-foreground'
		)}
	>
		{#if value && value.start}
			{#if value.end}
				{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
					value.end.toDate(getLocalTimeZone())
				)}
			{:else}
				{df.format(value.start.toDate(getLocalTimeZone()))}
			{/if}
		{:else}
			Escolha um período
		{/if}
		<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content
		class="w-auto p-0"
		side="top"
	>
		<RangeCalendar
			bind:value
			minValue={new CalendarDate(2024, 1, 1)}
			maxValue={today(getLocalTimeZone())}
			numberOfMonths={2}
			locale="pt-BR"
			initialFocus
		/>
	</Popover.Content>
</Popover.Root>
