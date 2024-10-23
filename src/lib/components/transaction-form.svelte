<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import DatePicker from './date-picker.svelte';

	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import {
		new_transaction_schema,
		edit_transaction_schema,
		type NewTransactionSchema,
		type EditTransactionSchema
	} from '$lib/transaction-form-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { toast } from 'svelte-sonner';

	import type { Transaction } from '$lib/db/schema';

	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import type { Selected } from 'bits-ui';

	type Props = {
		super_form: SuperValidated<Infer<NewTransactionSchema | EditTransactionSchema>>;
		transaction?: Transaction;
	};

	let { super_form, transaction }: Props = $props();

	const form = superForm(super_form, {
		validators: transaction
			? zodClient(edit_transaction_schema)
			: zodClient(new_transaction_schema),
		onUpdated({ form }) {
			if (form.valid) {
				toast.success($message);
				selected_code = { value: undefined };
				selected_dest = { value: undefined };
				$form_data.date = selected_date!.toDate(getLocalTimeZone());
			}
		}
	});

	if (transaction) super_form = super_form as SuperValidated<Infer<EditTransactionSchema>>;

	const { form: form_data, enhance, message } = form;

	const code_options = {
		income: [{ label: '1. Default income', value: 1 }],
		expense: [{ label: '2. Default expense', value: 2 }]
	};

	const destination_options = [
		{ label: 'Caixa', value: 'caixa' },
		{ label: 'Banco', value: 'banco' }
	];

	let selected_date: CalendarDate | undefined = $state(today(getLocalTimeZone()));
	let selected_code: Selected<number | undefined> = $state({ value: undefined });
	let selected_dest: Selected<string | undefined> = $state({ value: undefined });

	if (transaction) {
		$form_data = transaction;
		selected_code = Object.values(code_options)
			.flatMap((arr) => arr)
			.map((obj) => ({ label: obj.label, value: obj.value }))
			.find(({ value }) => value === transaction.code)!;
		selected_dest = destination_options.find(({ value }) => value === transaction.destination)!;
		selected_date = new CalendarDate(
			transaction.date.getFullYear(),
			transaction.date.getMonth() + 1,
			transaction.date.getDate()
		);
	}

	$effect(() => {
		if (selected_date) $form_data.date = selected_date.toDate(getLocalTimeZone());
	});
</script>

<form
	method="POST"
	action={transaction ? '?/edit' : '?/add'}
	class="grid grid-cols-2 gap-x-8 gap-y-2"
	use:enhance
>
	{#if 'id' in $form_data}
		<Form.Field
			{form}
			name="id"
			class="col-span-2"
		>
			<Form.Control let:attrs>
				<Form.Label>ID</Form.Label>
				<Input
					{...attrs}
					value={$form_data.id}
					disabled
				/>
			</Form.Control>
			<input
				type="hidden"
				name="id"
				value={$form_data.id}
			/>
		</Form.Field>
	{/if}

	<Form.Field
		{form}
		name="code"
	>
		<Form.Control let:attrs>
			<Form.Label>Code<span class="text-destructive">*</span></Form.Label>
			<Select.Root
				items={Object.values(code_options)
					.flatMap((arr) => arr)
					.map((obj) => ({ label: obj.label, value: obj.value }))}
				bind:selected={selected_code}
				onSelectedChange={(v) => {
					v && v.value && ($form_data.code = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Choose one" />
				</Select.Trigger>
				<Select.Content>
					{#each Object.entries(code_options) as [group_label, group_value]}
						<Select.Group>
							<Select.Label class="uppercase">{group_label}</Select.Label>
							{#each group_value as { label, value }}
								<Select.Item
									{value}
									{label}
								/>
							{/each}
						</Select.Group>
					{/each}
				</Select.Content>
				<Select.Input
					bind:value={$form_data.code}
					name={attrs.name}
				/>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
		{form}
		name="destination"
	>
		<Form.Control let:attrs>
			<Form.Label>Destination<span class="text-destructive">*</span></Form.Label>
			<Select.Root
				items={destination_options}
				bind:selected={selected_dest}
				onSelectedChange={(v) => {
					v && v.value && ($form_data.destination = v.value as 'caixa' | 'banco');
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Choose one" />
				</Select.Trigger>
				<Select.Content>
					{#each destination_options as { label, value }}
						<Select.Item
							{value}
							{label}
						/>
					{/each}
				</Select.Content>
				<Select.Input
					bind:value={$form_data.destination}
					name={attrs.name}
				/>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
		{form}
		name="amount"
	>
		<Form.Control let:attrs>
			<Form.Label>Amount<span class="text-destructive">*</span></Form.Label>
			<Input
				{...attrs}
				bind:value={$form_data.amount}
				type="number"
				min="0"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
		{form}
		name="date"
	>
		<Form.Control let:attrs>
			<Form.Label>Date<span class="text-destructive">*</span></Form.Label>
			<DatePicker bind:selected_date />
			<input
				hidden
				bind:value={$form_data.date}
				name={attrs.name}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
		{form}
		name="description"
		class="col-span-2"
	>
		<Form.Control let:attrs>
			<Form.Label>Description(optional)</Form.Label>
			<Input
				{...attrs}
				bind:value={$form_data.description}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="col-span-2">Submit</Form.Button>
</form>

<p><span class="text-destructive">*</span> Required fields</p>

<SuperDebug data={$form_data} />
