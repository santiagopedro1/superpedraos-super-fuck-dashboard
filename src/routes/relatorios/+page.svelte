<script lang="ts">
	import { formSchema, type FormSchema } from '$lib/form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { ActionData } from './$types';

	import * as Form from '$lib/components/ui/form';
	import DatePicker from '$lib/components/date-picker.svelte';

	import { getLocalTimeZone } from '@internationalized/date';

	import type { DateRange } from 'bits-ui';

	let { data, form: formAction }: { data: SuperValidated<Infer<FormSchema>>; form: ActionData } =
		$props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		resetForm: false
	});

	const { form: formData, enhance } = form;

	let value: DateRange | undefined = $state();

	$effect(() => {
		if (value) {
			if (value.start && value.end) {
				$formData.query = {
					start: value.start.toDate(getLocalTimeZone()),
					end: value.end.toDate(getLocalTimeZone())
				};
			}
		}
	});
</script>

<form
	method="POST"
	use:enhance
	class="flex justify-center"
>
	<div class="flex justify-center gap-16">
		<Form.Field
			{form}
			name="query"
			class="flex flex-col"
		>
			<Form.Control let:attrs>
				<Form.Label>Data</Form.Label>
				<DatePicker bind:value />
				<Form.FieldErrors />
				<input
					hidden
					{value}
					name={attrs.name}
				/>
			</Form.Control>
		</Form.Field>

		<Form.Button class="max-w-max self-center">Gerar</Form.Button>
	</div>
</form>

{#if formAction}
	{#if formAction.transactions}
		<pre>{JSON.stringify(formAction.transactions, null, 2)}</pre>
	{:else}
		<p class="text-center text-xl">Nenhum dado encontrado para a data especificada</p>
	{/if}
{/if}
