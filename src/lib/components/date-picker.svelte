<script lang="ts">
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';

	import type { DateRange } from 'bits-ui';

	import { cn } from '$lib/utils.js';

	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { dateFormatter } from '$lib';

	type Props = {
		range?: boolean;
		selected_range?: DateRange;
		selected_date?: CalendarDate;
	};

	let {
		selected_range = $bindable(),
		selected_date = $bindable(),
		range = false
	}: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'gap-4 font-normal')}>
		{#if selected_range?.start && selected_range?.end}
			{dateFormatter(selected_range.start)} - {dateFormatter(selected_range.end)}
		{:else if selected_date}
			{dateFormatter(selected_date)}
		{:else}
			{range ? 'Choose a period' : 'Choose a date'}
		{/if}
		<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content
		class="w-auto p-0"
		side="top"
	>
		{#if range}
			<RangeCalendar
				bind:value={selected_range}
				minValue={new CalendarDate(2024, 1, 1)}
				maxValue={today(getLocalTimeZone())}
				numberOfMonths={2}
				locale="en-US"
				weekdayFormat="short"
				initialFocus
			/>
		{:else}
			<Calendar
				bind:value={selected_date}
				minValue={new CalendarDate(2024, 1, 1)}
				maxValue={today(getLocalTimeZone())}
				locale="en-US"
				weekdayFormat="short"
				initialFocus
			/>
		{/if}
	</Popover.Content>
</Popover.Root>
