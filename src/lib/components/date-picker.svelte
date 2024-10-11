<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	let { selected_date }: { selected_date: DateValue | undefined } = $props();
</script>

<Popover.Root openFocus>
	<Popover.Trigger
		asChild
		let:builder
	>
		<Button
			variant="outline"
			class={cn(
				'w-[280px] justify-start text-left font-normal',
				!selected_date && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{selected_date ? df.format(selected_date.toDate(getLocalTimeZone())) : 'Select a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar
			bind:value={selected_date}
			initialFocus
		/>
	</Popover.Content>
</Popover.Root>
