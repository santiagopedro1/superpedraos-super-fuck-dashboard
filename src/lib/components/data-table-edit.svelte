<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Edit } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';

	import TransactionForm from '$lib/forms/edit-transaction-form.svelte';

	import type { Transaction } from '$lib/db/schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { EditTransactionSchema } from '$lib/forms/transaction-form-schema';

	interface Props {
		transaction: Transaction;
		edit_transaction_form: SuperValidated<Infer<EditTransactionSchema>>;
	}

	const { transaction, edit_transaction_form }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button
			variant="outline"
			size="icon"
		>
			<Edit />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add a Transaction</Dialog.Title>
		</Dialog.Header>
		<TransactionForm
			super_form={edit_transaction_form}
			{transaction}
		/>
	</Dialog.Content>
</Dialog.Root>
