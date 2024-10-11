<script lang="ts">
	import { formSchema, type FormSchema } from '$lib/form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';

	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, getLocalTimeZone, today, CalendarDate } from '@internationalized/date';
	import { cn } from '$lib/utils';

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	const { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		resetForm: false
	});

	const { form: formData, enhance } = form;

	const select_options = [{ value: 'single' }, { value: 'month' }, { value: 'year' }];
</script>

<form
	method="POST"
	use:enhance
	class="flex justify-center"
>
	<div class="grid grid-cols-3 gap-16">
		<Form.Field
			{form}
			name="type"
		>
			<Form.Control let:attrs>
				<Form.Label>Período de relatório</Form.Label>
				<Select.Root
					items={select_options}
					onSelectedChange={(v) => v && ($formData.type = v)}
				>
					<Select.Trigger
						{...attrs}
						class="w-56"
					>
						<Select.Value placeholder="Selecione uma opção" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="single">Data única</Select.Item>
						<Select.Item value="month">Mês</Select.Item>
						<Select.Item value="year">Ano</Select.Item>
					</Select.Content>
				</Select.Root>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		{#if $formData.type}
			{#if $formData.type.value === 'single'}
				<Form.Field
					{form}
					name="query"
					class="flex flex-col"
				>
					<Form.Control let:attrs>
						<Form.Label>Data</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...attrs}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-56 justify-start pl-4 text-left font-normal',
									!$formData.query && 'text-muted-foreground'
								)}
							>
								{$formData.query ? df.format($formData.query) : 'Escolha uma data'}
								<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content
								class="w-auto p-0"
								side="top"
							>
								<Calendar
									minValue={new CalendarDate(2024, 1, 1)}
									maxValue={today(getLocalTimeZone())}
									onValueChange={(v) => {
										v && ($formData.query = v.toDate(getLocalTimeZone()));
									}}
									initialFocus
								/>
							</Popover.Content>
						</Popover.Root>
						<Form.FieldErrors />
						<input
							hidden
							value={$formData.query}
							name={attrs.name}
						/>
					</Form.Control>
				</Form.Field>

				<Form.Button class="max-w-max self-center">Submit</Form.Button>
			{:else if $formData.type.value === 'month'}
				<p class="self-center">Não tem ainda</p>
			{:else if $formData.type.value === 'year'}
				<p class="self-center">Não tem ainda</p>
			{/if}
		{/if}
	</div>
</form>
